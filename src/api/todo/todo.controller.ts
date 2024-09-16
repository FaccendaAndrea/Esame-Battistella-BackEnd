import { NextFunction, Request, Response } from "express";
import todoSrv from './todo.service';
import { NotFoundError } from "../../errors/not-found";
import todoService from "./todo.service";
import { Todo } from "./todo.entity";
import { TypedRequest } from "../../utils/typed-request.interface";
import { CreateTodoDTO } from "./todo.dto";


export const list = async (req: TypedRequest<CreateTodoDTO>, res: Response, next: NextFunction) => {
  try {
    const includedCompleted = req.query.completed==="true";
    const idUtente = req.user!.id;
    const results = await todoSrv.find(includedCompleted, idUtente!);

    res.json(results);
  } catch (error) {

    next(error);
  }

}

export const detail = async (req: TypedRequest<CreateTodoDTO>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const item = await todoSrv.getById(id);
    if (!item) {
      throw new NotFoundError();
    }
    res.json(item);

  } catch (error) {
    next(error);
  }

}

export const add = async (req: TypedRequest<CreateTodoDTO>, res: Response, next: NextFunction) => {
  try {
    const { title, dueDate, assignedTo } = req.body;
    const createdBy = req.user?.id!;
    const newTodo: Todo = {
      title,
      dueDate,
      completed: false,
      createdBy,
      assignedTo
    }

    const saved = await todoService.add(newTodo);
    return res.status(201).json(saved);

  } catch (error) {
    next(error);
  }
}

export const check = async (req: TypedRequest<CreateTodoDTO>, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params;
    const assigned = todoService.assignedUser(id,req.params.idUser);
    const created = todoService.createdUser(id, req.params.idUser);

    if(!assigned && !created){
      console.error(); //tornare per gli errori
    }
    const updated = await todoService.check(id);
    res.json(updated);
    
    
  }catch(error){
   next(error);
  }
}

export const uncheck = async (req: TypedRequest<CreateTodoDTO>, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params;
    const assigned = todoService.assignedUser(id,req.params.idUser);
    const created = todoService.createdUser(id, req.params.idUser);
    
    if(!assigned && !created){
      console.error(); //tornare per gli errori
    }
    const updated = await todoService.uncheck(id);
    res.json(updated);
    
  }catch(error){
   next(error);
  }
}

export const assign = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params;
    const assegna = await todoService.assign(id,req.body.userId);
    if(!assegna){
      console.error(); //tornare per gli errori
    }
    const updated = await todoService.uncheck(id);
    res.json(updated);
  }catch(error){
    next(error);
  }
}

