import { Todo } from "./todo.entity";
import mongoose, { Schema, Document,Types } from "mongoose";
import { User } from "../user/user.entity";


const todoSchema = new mongoose.Schema<Todo>({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dueDate: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' }
});



todoSchema.virtual('expired').get(function (this: Todo) {

    if (this.completed !== undefined && this.completed) {
        return undefined;
    }
    if (this.dueDate == undefined) {
        return undefined;
    }
    if (this.dueDate !== undefined) {
        const dueDate = new Date(this.dueDate);
        return dueDate < new Date();
    }
    return false;
});

todoSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});



export const TodoModel = mongoose.model<Todo>('Todo', todoSchema);