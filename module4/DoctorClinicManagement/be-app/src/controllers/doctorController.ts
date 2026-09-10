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

export async function getTimeSlotsByDoctor(req: Request, res: Response, next: NextFunction) {
    try {
        const doctorId = Number(req.params.id);
        // console.log("getTimeSlotsByDoctor ",doctorId )
        const data = await svc.timeSlot(doctorId);
        // console.log("getTimeSlotsByDoctor data ", data)
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
}

export async function createTimeSlots(req: Request, res: Response, next: NextFunction) {
    try {
        const doctorId = Number(req.params.id);
        const data = await svc.createTimeSlots(doctorId, req.body);

        return res.status(201).json({
            success: true,
            message: "Tạo lịch khám thành công",
            data,
        });
    } catch (error) {
        next(error);
    }
}

export async function updateTimeSlotStatus(req: Request, res: Response, next: NextFunction) {
    try {
        // Lấy slotId từ params (:id hoặc :slotId)
        const slotId = Number(req.params.slotId || req.params.id);
        const { isBlocked } = req.body;

        const data = await svc.updateTimeSlotStatus(slotId, isBlocked);

        return res.status(200).json({
            success: true,
            message: "Cập nhật trạng thái ca khám thành công",
            data,
        });
    } catch (error) {
        next(error);
    }
}