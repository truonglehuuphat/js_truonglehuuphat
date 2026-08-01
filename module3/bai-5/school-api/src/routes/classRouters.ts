
import { Request, Response, NextFunction, Router } from "express";
import pool from "../db/pool";
import { Ok } from "../help/helper";
import { prisma } from "../utils/prismaClient";
// import { findAll, getAllClasses } from "../services/classService";
import { classQuerySchema } from "../schemas/classSchema";
import { validateQuery } from "./studentRoutes";
import { getAllClasses } from "../controller/classController";
import { findAll } from "../services/classService";

const classRouter = Router();

classRouter.get("/", findAll);

classRouter.post("/", async (request: Request, respone: Response, next: NextFunction) => {
    try {
        const body = request.body;
        const result = await prisma.class.create({
            data: {
                name: body.name,
                subject: body.name,
                teacherName: body.teachName,
                maxStudents: body.maxStudents,
                schedule: body.schedule,
                createdAt: body.createAt,
            }
        })
    } catch (error) {
        console.log(error)
    }

})

export default classRouter;