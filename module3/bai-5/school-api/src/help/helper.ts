import { Response } from "express";

export function Ok<T>(response: Response, data: T, status = 200) {
    response.status(status).json({ success: true, data });
}