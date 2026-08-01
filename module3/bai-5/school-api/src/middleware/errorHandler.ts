import {AppError} from "../types/api"
import {Request, Response, NextFunction } from "express"
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/client"

export function errorHandle(err: Error, req: Request, res: Response, next: NextFunction){
    
    if(err instanceof PrismaClientKnownRequestError){
        switch(err.code){
            case "P2025": return res.status(404).json({
                success: false, message: "Không tìm thấy"
            });
            case "P2002": return res.status(409).json({
                success:false, message: "Dữ liệu đã tồn tại"
            })
            case "P2003": return res.status(400).json({
                success: false, message: "ID tham chiếu không tồn tại"
            });
        }
    }

    if(err instanceof AppError){
        return res.status(err.statusCode).json({success: false, message: err.message});
    }

    console.error(err);
    res.status(500).json({success: false, message: "Lỗi server"});
}