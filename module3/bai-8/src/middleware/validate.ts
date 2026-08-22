import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/api";

export const validate = (schema: yup.ObjectSchema<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body);
            next();
        } catch (err: any) {
            next(new AppError(400, err.message));
        }
    }

export const validateQuery = (schema: yup.ObjectSchema<any>) => 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = await schema.validate(req.query, { abortEarly: false });
            Object.assign(req.query, validated);
            next();
        } catch (error: any) {
            next(new AppError(400, error.message));
        }
    };

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        throw new AppError(400, "ID phải là số hợp lệ");
    }
    res.locals.id = Number(id);
    next();
}

export const validateGradeId = (req: Request, res: Response, next: NextFunction) => {
    const { gradeId } = req.params;
    if (!gradeId || isNaN(Number(gradeId))) {
        throw new AppError(400, "ID phải là số hợp lệ");
    }
    res.locals.id = Number(gradeId);
    next();
}