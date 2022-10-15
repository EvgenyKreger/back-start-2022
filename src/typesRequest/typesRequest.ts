import {Request} from "express";
//1 : Param; 2 : ResBody; 3 : RequestBody; 4 : ReqQuery; 5 : Locals
export type RequestWithBody<T> = Request<{}, {}, T>
//export type RequestWithQuery<T> = Request<{}, {}, {}, T>
export type RequestWithParams<T> = Request<T>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>