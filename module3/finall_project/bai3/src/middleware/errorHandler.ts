import {AppError} from "../types/api"
import { Request, Response, NextFunction } from "express"

export const errorHandle = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({success: false, message: err.message});
        console.log(err.message);
    }
    res.status(500).json({success: false, message: "Lỗi server"});
}