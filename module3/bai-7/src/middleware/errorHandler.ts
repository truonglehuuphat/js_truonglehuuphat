import {Response, Request, NextFunction } from "express";
import { AppError } from "../types/api";


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({success: false, message: err.message});
    }
    console.error(err);
    res.status(500).json({success: false, message: "Lỗi server"});
}