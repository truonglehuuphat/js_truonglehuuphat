import { Request, Response, NextFunction } from "express";
import * as svc from "../services/classService";
import { buildMeta } from "../utils/pagination";

export async function getClasses(request: Request, respone: Response, next: NextFunction) {
    try {
        const query = request.query as any;
        const { data, total } = await svc.findAll(query);
        respone.status(200).json({
            success: true,
            data: data,
            meta: buildMeta(total, query.page, query.limit)
        });
    } catch (e) {
        next(e);
    }
}

export async function getClassDetail(request: Request, respone: Response, next: NextFunction) {
    try {
        const classId = respone.locals.id;
        const classData = await svc.findById(classId);
        respone.json({
            success: true,
            data: classData
        })
    } catch (error) {
        next(error)
    }
}

export async function createClass(request: Request, respone: Response, next: NextFunction) {
    try {
        const body = request.body;
        const classData = await svc.create(body);
        respone.json({
            success: true,
            data: classData
        })
    } catch (error) {
        next(error)
    }
}

export async function updateClass(request: Request, respone: Response, next: NextFunction) {
    try {
        const classId = respone.locals.id;
        const classData = await svc.update(classId, request.body);
        respone.json({
            success: true,
            data: classData
        })
    } catch (error) {
        next(error)
    }
}

export async function deleteClass(request: Request, respone: Response, next: NextFunction) {
    try {
        const classId = respone.locals.id;
        await svc.remove(classId);
        respone.json({
            success: true,
            data: "Đã xóa lớp"
        })
    } catch (error) {
        next(error)
    }
}

export async function transferStudent(request: Request, respone: Response, next: NextFunction) {
    try {
        const studentId = request.body;
        const newClassId = respone.locals.id;
        const student = await svc.transferStudent(studentId, newClassId);
        
        respone.json({
            success: true,
            data: "student"
        })
    } catch (error) {
        next(error)
    }
}