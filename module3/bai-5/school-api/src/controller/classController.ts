import { Request, Response, NextFunction } from "express";
import * as classService from "../services/classService";

export async function getAllClasses(request: Request, respone: Response, next: NextFunction) {
    try {
        const { id, name, subject, teacherName, schedule, page = 1, limit = 10 } = request.query;
        // console.log("#4");
        // 2. Gọi sang Service xử lý
        const filters = {      
            id: id,
            name: name as string,
            subject: subject as string,
            teacherName: teacherName as string,
            schedule: schedule as string,
            page: Number(page),
            limit: Number(limit)
        };

        const result = await classService.findAll({filters});

        respone.status(200).json({
            success: true,
            data: result.data,
            total: result.total,
            page: Number(page),
            limit: Number(limit),
        });
    } catch (e) {
        next(e);
    }
}