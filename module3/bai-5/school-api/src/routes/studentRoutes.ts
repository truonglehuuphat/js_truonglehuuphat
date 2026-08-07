import { studentQuerySchema, studentCreateSchema, gradeCreateSchema, gradeUpdateSchema } from "../schemas/index";
import * as studentController from "../controller/studentController"
import * as gradeController from "../controller/gradeController"
import { validate, validateId, validateQuery } from "../middleware/validate";
import { Router } from 'express';

const studentRouter = Router();

studentRouter.get("/", validateQuery(studentQuerySchema), studentController.getStudents);

studentRouter.get("/:id", validateId, studentController.getStudentDetail);

studentRouter.post("/",validate(studentCreateSchema), studentController.createStudent);

studentRouter.patch("/:id", validateId, studentController.updateStudent);

studentRouter.delete("/:id",validateId, studentController.deleteStudent);

studentRouter.post("/:id/grades",validateId, validate(gradeCreateSchema), gradeController.addGrade);

studentRouter.get("/:id/grades", validateId, gradeController.getStudentGrades);

studentRouter.patch("/:id/grades/:gradeId", validateId, validate(gradeUpdateSchema), gradeController.updateGrade);

studentRouter.delete("/:id/grades/:gradeId", validateId, gradeController.deleteGrade);

export default studentRouter;
