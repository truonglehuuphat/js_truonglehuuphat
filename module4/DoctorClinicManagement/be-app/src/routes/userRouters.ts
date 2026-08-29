import { Router } from 'express'
import { authenticate } from '../mildware/authenticate';
import { validate, validatedId, validateQuery } from '../mildware/validate';
import { updateProfileSchema, updateRoleSchema, userQuerySchema } from '../schema/userSchema';
import * as controller from '../controllers/userController';
import { authorize } from '../mildware/authorize';
import { authorizeOwner } from '../mildware/authorizeOwner';

const userRouters = Router();

//mọi route /users đều yêu cầu đăng nhập
userRouters.use(authenticate);

// GET /users chỉ admin (?role=&search=&page=&limit=)
userRouters.get('/', authorize('admin'), validateQuery(userQuerySchema), controller.getUsers);

// GET /user:id - chỉ admin
userRouters.get('/:id', authorize('admin'), validatedId, controller.getUserById);

// Update profile: self OR admin
userRouters.get('/:id', 
    validatedId, 
    authorizeOwner(async (req) => parseInt(req.params.id as string, 10)), 
    validate(updateProfileSchema), 
    controller.updateProfile
);

//change role /delete: admin onlu (and not on selft)
userRouters.patch('/:id/role', authorize('admin'), validatedId, validate(updateRoleSchema), controller.updateRole);
userRouters.delete('/:id', authorize('admin'), validatedId, controller.deleteUser);

export default userRouters;