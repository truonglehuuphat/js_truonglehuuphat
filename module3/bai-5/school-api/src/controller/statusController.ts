import { Request, Response, NextFunction } from "express";
import * as svc from '../services/statusService';

export async function getStats(req: Request, res: Response, next: NextFunction) {
    try {
        const stats = await svc.getStats();
        res.json({
            success: true,
            data: stats
        })
    } catch (e) {
        next(e)
    }
}