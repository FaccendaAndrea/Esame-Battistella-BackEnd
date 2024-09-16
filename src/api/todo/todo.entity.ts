import { Types } from "mongoose"
import { User } from "../user/user.entity"

export interface Todo{
    id?: string,
    title: string,
    dueDate?: string,
    completed: boolean,
    createdBy: string | Types.ObjectId,
    assignedTo?: string | Types.ObjectId
}