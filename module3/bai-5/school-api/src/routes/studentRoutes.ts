import { Request, Response, NextFunction, Router } from "express";
import pool from "../db/pool";
import { Ok } from "../help/helper";
import { prisma } from "../utils/prismaClient";
import { ObjectSchema } from "yup";
const studentrouter = Router();

export function validateQuery(schema: ObjectSchema<any>) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.validate(req.query, {
                abortEarly: false,
                stripUnknown: true,
                strict: false,
            },)
            next();
        } catch (e: any) {
            res.status(400).json({
                success: false,
                message: "Query params không hợp lệ",
                errors: e.inner?.map((e: any) => ({ field: e.path, message: e.message }))
            })
        }
    }
}

studentrouter.get("/", async (request: Request, respone: Response, next: NextFunction) => {
    const result = await prisma.student.findMany();
    Ok(respone, result);
})

studentrouter.get("/", async (request: Request, respone: Response, next: NextFunction) => {
    const id = request.query.id;
    const queryId = !id || typeof id != "string" ? {} : {
        id: parseInt(id)
    }
    const result = await prisma.student.findMany({
        where: queryId
    })
    Ok(respone, result);
})

studentrouter.get("/:id/grades", (request: Request, respone: Response, next: NextFunction) => {

})

studentrouter.post("/", async (request: Request, respone: Response, next: NextFunction) => {
    const body = request.body;
    try {
        const result = prisma.student.create({
            data: {
                fullname: body.full_name,
                email: body.email,
                phone: body.phone,
                class_id: body.class_id,
                gpa: body.gpa,
                status: body.status,

            }
        })
    } catch (error) {

    }

})

studentrouter.post("/:id/grades", (request: Request, respone: Response, next: NextFunction) => {

})

studentrouter.patch("/:id", (request: Request, respone: Response, next: NextFunction) => {

})

export default studentrouter;
