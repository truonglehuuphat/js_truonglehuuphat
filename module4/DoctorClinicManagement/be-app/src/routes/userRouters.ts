import { Router } from 'express'
import { authenticate } from '../mildware/authenticate';
import { validate, validatedId, validateQuery } from '../mildware/validate';
import { updateProfileSchema, updateRoleSchema, userQuerySchema } from '../schema/userSchema';
import * as controller from '../controllers/userController';
import * as doctorController from '../controllers/doctorController';
import * as appointmentController from '../controllers/appointmentsController';
import * as reviewDoctor from '../controllers/reviewController';
import { authorize } from '../mildware/authorize';
import { authorizeOwner } from '../mildware/authorizeOwner';

const userRouters = Router();

//mọi route /users đều yêu cầu đăng nhập
userRouters.use(authenticate, authorize("patient"));

userRouters.get("/doctors/:id", doctorController.getDoctorById);
userRouters.get("/doctors/:id/available-slots", doctorController.getAvailableTimeSlots);
userRouters.get("/doctors", doctorController.getDoctors);

userRouters.post("/appointments", appointmentController.book);
userRouters.get("/appointments", appointmentController.getMyAppointments);
userRouters.patch("/appointments/:id/cancel", appointmentController.cancelAppointment);
userRouters.patch("/appointments/:id/reviews", appointmentController.createReview);
userRouters.patch("/appointments/:id/reviews", appointmentController.getReview);
userRouters.get("/appointments/:id/reviews", reviewDoctor.getReviews);
userRouters.get("/appointments/:id/reviews", reviewDoctor.getReviewById);

export default userRouters;