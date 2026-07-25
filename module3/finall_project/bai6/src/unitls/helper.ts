import { Response } from "express";

export function ok<T>(res: Response, data: T, status = 200) {
    res.status(status).json({ success: true, data });
}