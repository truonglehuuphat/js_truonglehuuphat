
import { Request, Response, NextFunction, Router } from "express";
import { findAll } from "../services/classService";
import { validate, validateId, validateQuery } from "../middleware/validate";
import prisma from "../db/prisma";
import { classCreateSchema, classQuerySchema } from "../schemas";
import * as classController from "../controller/classController";
const classRouter = Router();

classRouter.get("/", validateQuery(classQuerySchema), classController.getClasses);
classRouter.get("/:id", validateId, classController.getClassDetail);
classRouter.post("/", validate(classCreateSchema), classController.createClass);
classRouter.patch("/:id", validateId, classController.updateClass);
classRouter.delete("/:id", validateId, classController.deleteClass);
classRouter.post("/:id/transfer-student", validateId, classController.transferStudent);

export default classRouter;