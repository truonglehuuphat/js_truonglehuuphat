import { Router } from 'express'
import { authenticate } from '../mildware/authenticate';
import { validate, validatedId, validateQuery } from '../mildware/validate';
import { updateProfileSchema, updateRoleSchema, userQuerySchema } from '../schema/userSchema';
import * as controller from '../controllers/appointmentsController';
import * as reviewController from '../controllers/reviewController';
import { authorize } from '../mildware/authorize';
import { authorizeOwner } from '../mildware/authorizeOwner';

const appointmentRouter = Router();

//mọi route /users đều yêu cầu đăng nhập
appointmentRouter.use(authenticate);

appointmentRouter.post(
    "/",
    authorize('patient','admin'),
    controller.createAppointment
);

appointmentRouter.get(
    "/me",
    authorize('patient','admin'),
    controller.me
);

appointmentRouter.get(
    "/:doctorId",
    validatedId,
    authenticate,
    authorize('patient','admin'),
    controller.getDoctor
);

appointmentRouter.patch(
    "/:id/status",
    validatedId,
    authenticate,
    authorize('patient','doctor','admin'),
    controller.updateStatus
);

appointmentRouter.post(
    "/:id/review",
    validatedId,
    authenticate,
    authorize('patient','doctor','admin'),
    reviewController.createReview
);

export default appointmentRouter;