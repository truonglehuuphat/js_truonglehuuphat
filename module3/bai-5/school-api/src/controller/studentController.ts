import { Request, Response, NextFunction } from 'express';
import * as svc from "../services/studentsService";
import { buildMeta } from "../utils/pagination";

export async function getStudents(request: Request, respone: Response, next: NextFunction) {
    try {
        const query = request.query as any;
        const { data, total } = await svc.findAll(query);
        respone.json({ success: true, data, meta: buildMeta(total, query.page, query.limit) });
    } catch (error) {
        next(error);
    }
}

export async function getStudentDetail(req: Request, res: Response, next: NextFunction) {
    try {
        const id = res.locals.id;
        const student = await svc.findById(id);
        res.json({ success: true, data: student });
    } catch (err) {
        next(err)
    }
}

export async function createStudent(req: Request, res: Response, next: NextFunction) {
    const student = await svc.create(req.body);
    res.status(201).json({ success: true, data: student })
}

export async function updateStudent(req: Request, res: Response, next: NextFunction) {
    const id = res.locals.id;
    const student = await svc.update(id, req.body);
    res.json({success: true, data:student});
}

export async function deleteStudent(req: Request, res: Response, next: NextFunction) {
    const id = res.locals.id;
    const student = await svc.remove(id);
    res.json({success: true, message: "Đã xóa sinh viên"});
}