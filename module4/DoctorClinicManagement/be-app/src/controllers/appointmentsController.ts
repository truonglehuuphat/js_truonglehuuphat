import { Request, Response, NextFunction } from "express";
import * as doctorSvc from '../services/doctorService';
import { buildMeta } from "../utils/pagination";
import * as appointmentSvc from '../services/appointmentService';

export interface CreateBookingDTO {
    doctorId: number;
    timeSlotId: number;
    userId?: number;
}

export async function getAllAppointments(req: Request, res: Response, next: NextFunction) {
    try {

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

    } catch (error) {
        next(error);
    }
}

export async function book(req: Request, res: Response, next: NextFunction) {
    try {
        appointmentSvc.createAppointment(req.body);
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