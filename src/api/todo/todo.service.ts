import { TodoModel } from "./todo.model";
import { Todo } from "./todo.entity";
import { NotFoundError } from "../../errors/not-found";
import { User } from "../user/user.entity";
import { UserModel } from "../user/user.model";
import { CreateTodoDTO } from "./todo.dto";

export class TodoService {
    async find(includedCompleted: boolean, idUser: String): Promise<Todo[]> {
        const q: any = {$or:[{createdBy:idUser},{assignedTo:idUser}]};
        if (!includedCompleted) {
            q.completed=false;
        }

        const result = await TodoModel.find(q).populate('createdBy assignedTo');
        return result;
    }
    async getById(id: string): Promise<Todo | null> {
        return TodoModel.findById(id);
    }

    async add(item: Todo): Promise<Todo> {
        const newItem = await TodoModel.create({
            title: item.title,
            dueDate: item.dueDate,
            completed: item.completed,
            createdBy: item.createdBy,
            assignedTo: item.assignedTo
        });
        return newItem.toObject(); // Converti il documento Mongoose in un oggetto puro per garantire che l'ID sia incluso
    }


    async check(id: string): Promise<Todo> {
        const todoAggiornato = await TodoModel.findByIdAndUpdate(id, { completed: true }, { new: true }).populate('createdBy assignedTo');
        if (!todoAggiornato) {
            throw new NotFoundError;
        }
        return todoAggiornato;

    }

    async uncheck(id: string): Promise<Todo> {
        const todoAggiornato = await TodoModel.findByIdAndUpdate(id, { completed: false }, { new: true }).exec();
        if (!todoAggiornato) {
            throw new NotFoundError;
        }
        return todoAggiornato;

    }

    async updateTodoExpiredStatus(id: string, expired: boolean): Promise<Todo | null> {
        try {
            const todo = await TodoModel.findById(id);
            if(!todo){
                return null;
            }
            await todo.save();
            return todo;
        }
        catch(error){
            throw new NotFoundError;
        }
        
    }

    async assignedUser(todoId: string, idUser: string){
        const user = await TodoModel.findById(todoId);
        return user && user.assignedTo?.toString()===idUser;
    }

    async createdUser(todoId: string, idUser: string){
        const user = await TodoModel.findById(todoId);
        return user && user.createdBy?.toString()===idUser;
    }

    async assign(todoId: string, idUser: string): Promise<Todo | null> {
        const todo = await TodoModel.findById(todoId);
    
        if (todo) {
            todo.assignedTo = idUser;
            await todo.save();
            return todo.toObject(); 
        }
        return null;
    }
    
}
export default new TodoService();
