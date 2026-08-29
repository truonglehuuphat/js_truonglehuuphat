import { Request, Response, NextFunction } from "express"
import { AppError } from "../types/api";

export function authorizeOwner(getOwnerId: (req: Request) => Promise<number | null>) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.user) { next(new AppError(401, 'Chưa đăng nhập')); return }
            //admin luôn pas
            if (req.user.role === 'admin') { next(); return; }
            const ownerId = await getOwnerId(req);
            if (ownerId === null) {throw new AppError(404, 'Không tìm thấy tài nguyên');}
            if(ownerId !== req.user.id) { throw new AppError(403, 'Bạn không có quyền thao tác tài nguyên này');}
            next();
        }
        catch (err) {
            next(err);
        }
    }
}