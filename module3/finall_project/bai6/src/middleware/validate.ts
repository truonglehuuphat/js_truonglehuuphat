import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: yup.ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
        next();
    } catch (err: any) {
        const errors = err.inner.map((e: yup.ValidationError) => ({
            field: e.path,
            message: e.message,
        }));
        res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ", errors });
    }
}