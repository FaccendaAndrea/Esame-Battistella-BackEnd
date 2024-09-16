import express, {NextFunction, Request, Response} from 'express';

export class NotFoundError extends Error{
    constructor(){
        super('Entity not found');
    }
}

export const notFoundHandler = (err: Error,req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof NotFoundError){
        res.status(404);
        res.json({
            error: 'NotFoundError',
            message:'EntityNotFoun'
        });
    }
    else{
        next(err);
    }
}