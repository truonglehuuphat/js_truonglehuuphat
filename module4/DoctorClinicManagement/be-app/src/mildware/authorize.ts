import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/api';
import jwt from 'jsonwebtoken';

// Phân quyền theo vai trò (RBAC) — dùng SAU middleware authenticate.
// Ví dụ: authorize('admin') hoặc authorize('admin', 'manager')
export function authorize(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        // const authHeader = req.headers.authorization;
        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     return res.status(401).json({ message: 'Missing or invalid token' });
        // }

        // const token = authHeader.split(' ')[1];
        // const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key') as JwtPayload;

        if (!req.user) {
            next(new AppError(401, 'Chưa đăng nhập'));
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            next(new AppError(403, 'Bạn không có quyền thực hiện thao tác này'))
        }

        // Gắn user vào request
        // (req as any).user = decoded;
        next();
    }
}