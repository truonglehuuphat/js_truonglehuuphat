import { Request, Response, NextFunction } from "express";
import * as svc from '../services/doctorService';
import { buildMeta } from "../utils/pagination";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                role: string;
            };
        }
    }
}

export async function getDoctors(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.query as any;
        const { data, total } = await svc.findAll(query);
        res.json({
            success: true,
            data,
            mega: buildMeta(total, query.page, query.limit)
        });
    } catch (error) {
        next(error);
    }
}

export async function getDoctorById(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await svc.findById(res.locals.id);
        res.json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const targetId = res.locals.id;
        // Kiểm tra an toàn
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: Thiếu thông tin user' });
        }
        const userData = req.body as any;
        const requesterId = req.user.id;
        const user = await svc.updateProfile(targetId, userData, requesterId);
        res.json({ success: true, data: user })
    } catch (error) {
        next(error);
    }
}

export async function deleteDoctor(req: Request, res: Response, next: NextFunction) {
    try {
        const targetId = res.locals.id;
        // Kiểm tra an toàn
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: Thiếu thông tin user' });
        }
        const requesterId = req.user.id;
        const user = await svc.remove(targetId, requesterId);
        res.json({ success: true, data: user })
    } catch (error) {
        next(error);
    }
}

export async function getAvailableTimeSlots(req: Request, res: Response, next: NextFunction) {
    try {
        //id doctor
        // goi vao findByDoctorId trong timeSlotService
        // trả về data
    } catch (error) {
        next(error);
    }
}

export async function createDoctor(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
        next(error);
    }
}