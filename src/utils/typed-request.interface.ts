import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export interface TypedRequest<T = unknown, Q = ParsedQs, P = ParamsDictionary>  //body, query params e altri parametri
          extends Request<P, any, T, Q> { };

export { ParsedQs, ParamsDictionary };