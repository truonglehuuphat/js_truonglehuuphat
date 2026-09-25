import { Request, Response, NextFunction } from "express";
import * as doctorSvc from '../services/doctorService';
import { buildMeta } from "../utils/pagination";
import * as appointmentSvc from '../services/appointmentService';

export interface CreateBookingDTO {
    doctorId: number;
    timeSlotId: number;
    userId?: number;
}

interface AccessTokenPayload {
    id: number;
    email: string;
    role: string;
}

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    };
}

export async function getAllAppointmentsById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: 'Không tìm thấy thông tin User' });
        }
        const response = await appointmentSvc.getAllAppointmentsById(userId);
        // console.log("response" ,response);
        return res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        next(error);
    }
}

export async function updateAppointmentStatus(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
        next(error);
    }
}

export async function getMyAppointments(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
        next(error);
    }
}

export async function cancelAppointment(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body;
        console.log("data", data);
        const message = await appointmentSvc.remove(data);
        console.log("message", message);
        if (message.includes("thất bại")) {
            return res.status(400).json({
                success: false,
                message: message, // "Xóa lịch thất bại thời gian phải trên 2 tiếng"
            });
        }
        return res.status(200).json({
            success: true,
            message: message
        });
    } catch (error) {
        console.error("Lỗi server:", error);
        next(error);
    }
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const response = appointmentSvc.create(req.body);
        return res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        next(error);
    }
}

export async function updateStatus(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
        next(error);
    }
}

export async function createReview(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
        next(error);
    }
}

export async function getReview(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
        next(error);
    }
}