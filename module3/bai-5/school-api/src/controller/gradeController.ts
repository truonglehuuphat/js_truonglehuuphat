import { Request, Response, NextFunction } from 'express';
import * as svc from "../services/gradeService";

export async function addGrade(req: Request, res: Response, next: NextFunction) {
    try {
        const id = res.locals.id;
        const grade = await svc.addGrade(id, req.body);
        res.status(201).json({
            success: true,
            data: grade
        });
    } catch (error) {
        next(error);
    }
}

export async function updateGrade(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const grade = await svc.updateGrade(Number(id), req.body);
        res.json({
            success: true,
            data: grade
        });
    } catch (error) {
        next(error);
    }
}

export async function getStudentGrades(req: Request, res: Response, next: NextFunction) {
    try {
        const studentId = res.locals.id;
        const grades = await svc.getStudentById(studentId);
        res.json({
            success: true,
            data: grades
        })
    }
    catch (error) {
        next(error)
    }
}

export async function deleteGrade(req: Request, res: Response, next: NextFunction) {
    try {
        const { gradeId } = req.params;
        await svc.deleteGrade(Number(gradeId))
        res.json({success:true, message: "Đã xóa điểm"});
    } catch (error) {
        next(error);
    }
}
