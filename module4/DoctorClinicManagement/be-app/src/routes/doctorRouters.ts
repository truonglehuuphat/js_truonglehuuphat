import { Router } from 'express'
import { authenticate } from '../mildware/authenticate';
import { validate, validatedId, validateQuery } from '../mildware/validate';
import { updateProfileSchema, updateRoleSchema, userQuerySchema } from '../schema/userSchema';
import * as controller from '../controllers/doctorController';
import * as reviewController from '../controllers/reviewController';
import * as timeslotController from '../controllers/timeslotController';
import { authorize } from '../mildware/authorize';
import { authorizeOwner } from '../mildware/authorizeOwner';

const doctorRouters = Router();

//mọi route /users đều yêu cầu đăng nhập
doctorRouters.use(authenticate);
// GET /users chỉ admin (?role=&search=&page=&limit=)
doctorRouters.get('/', authorize('doctor', 'admin'), validateQuery(userQuerySchema), controller.getUsers);

// GET /user:id - chỉ admin
doctorRouters.get('/:id',
    authorize('doctor', 'admin'),
    validatedId, controller.getUserById
);

// Update profile: self OR admin
//change role /delete: admin onlu (and not on selft)
doctorRouters.patch('/:id',
    validatedId,
    authorizeOwner(async (req) => parseInt(req.params.id as string, 10)),
    authorize("admin"),
    controller.updateProfile
);

// delete doctor
doctorRouters.delete('/:id',
    validatedId,
    authorize("admin"),
    controller.deleteDoctor
);

// GET timeSlot
doctorRouters.get('/:id/timeslots',
    authorize('doctor', 'admin'),
    validatedId, timeslotController.getAllTimeSlots
);

// GET timeSlot
doctorRouters.post('/:id/timeslots',
    authorize('doctor', 'admin'),
    validatedId, timeslotController.createTimeSlots
);

//GET review
doctorRouters.get('/:id/reviews',
    validatedId,
    authorize('doctor','admin'),
    reviewController.getReviews
);


export default doctorRouters;