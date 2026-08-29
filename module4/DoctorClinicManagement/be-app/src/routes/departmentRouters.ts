import { Router } from 'express'
import { authenticate } from '../mildware/authenticate';
import { validate, validatedId, validateQuery } from '../mildware/validate';
import { updateProfileSchema, updateRoleSchema, userQuerySchema } from '../schema/userSchema';
import * as controller from '../controllers/departmentController';
import { authorize } from '../mildware/authorize';
import { authorizeOwner } from '../mildware/authorizeOwner';

const departmentRouters = Router();

departmentRouters.get("/", controller.getAllDepartment);

 //yêu cầu đăng nhập - quyền admin
departmentRouters.use(authenticate); //yêu cầu đăng nhập
departmentRouters.post("/", authorize("ADMIN"), controller.create);
departmentRouters.patch("/:id",validatedId, authorize("ADMIN"), controller.updateById);
departmentRouters.delete("/:id", validatedId, authorize("ADMIN"), controller.deleteById);

export default departmentRouters;