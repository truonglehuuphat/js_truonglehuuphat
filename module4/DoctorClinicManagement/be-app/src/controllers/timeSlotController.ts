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

export async function getAllTimeSlots(req: Request, res: Response, next: NextFunction){
    try {
        
    } catch (error) {
        next(error);
    }
}

export async function createTimeSlots(req: Request, res: Response, next: NextFunction){
    try {
        
    } catch (error) {
        next(error);
    }
}

export async function updateStatus(req: Request, res: Response, next: NextFunction){
    try {
        
    } catch (error) {
        next(error);
    }
}
