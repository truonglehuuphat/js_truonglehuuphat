import { Request, Response, NextFunction } from "express";
import { AppError, ApiResponse } from "../types/api";
import { ValidationError } from "yup";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        res.status(err.statuscode).json({ success: false, message: err.message });
        return;
    }
    if (err instanceof ValidationError) {
        res.status(400).json({
            success: false,
            message: 'Dữ liệu không hợp lệ',
            errors: err.inner.map((e) => ({ field: e.path, message: e.message })),
        });
        return;
    }
    // Prisma known errors
    if (err.code === 'P2002') {
        res.status(409).json({ success: false, message: 'Học viên đã đăng ký khoá học này' });
        return;
    }
    if (err.code === 'P2025') {
        res.status(404).json({ success: false, message: 'Không tìm thấy bản ghi' });
        return;
    }
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi server' });
}

export const notFoundHandler = (req: Request, res: Response) => {
    const response: ApiResponse = {
        success: false,
        message: `Router không tìm thấy: ${req.method} ${req.path}`,
    };
    res.status(404).json(response);
}
