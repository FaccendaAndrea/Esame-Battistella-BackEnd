import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import userService from "./user.service";

export const list = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const results = await userService.find();
    res.json(results);
  } catch (error) {

    next(error);
  }
}

export const me = async (req: TypedRequest, res: Response, next: NextFunction) => {
  res.json(req.user!);
}