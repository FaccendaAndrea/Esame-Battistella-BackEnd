import { IsDateString, IsMongoId, IsOptional, IsString, isDateString, isString } from "class-validator";
import { Types } from "mongoose";

export class CreateTodoDTO{
    @IsString()
    title: string;

    @IsDateString()
    @IsOptional()
    dueDate? : string;

    completed: boolean;

    @IsOptional()
    @IsMongoId()
    assignedTo?: Types.ObjectId;
}

