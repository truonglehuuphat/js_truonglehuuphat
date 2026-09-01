import { Router } from 'express'
import { authenticate } from '../mildware/authenticate';
import { validate, validatedId, validateQuery } from '../mildware/validate';
import { updateProfileSchema, updateRoleSchema, userQuerySchema } from '../schema/userSchema';
import * as controller from '../controllers/doctorController';
import * as reviewController from '../controllers/reviewController';
import * as timeslotController from '../controllers/timeslotController';
import * as appointmentController from '../controllers/appointmentController';
import { authorize } from '../mildware/authorize';
import { authorizeOwner } from '../mildware/authorizeOwner';

const doctorRouters = Router();

//Doctor
//mọi route /users đều yêu cầu đăng nhập
doctorRouters.use(authenticate, authorize('doctor'));
// GET /users
doctorRouters.get('/', validateQuery(userQuerySchema), controller.getDoctors);
// GET /user:id
doctorRouters.get('/:id', validatedId, controller.getDoctorById);

//timeSlot
// GET timeSlot
doctorRouters.get('/:id/timeslots', validatedId, reviewController.getReviews);
// post timeSlot
doctorRouters.post('/:id/timeslots', validatedId, timeslotController.createTimeSlots);
// patch timeSlot
doctorRouters.patch('/:id/', validatedId, timeslotController.updateStatus);

//review
//GET 
doctorRouters.get('/:id/reviews', validatedId, reviewController.getReviews);

//appointments
//GET 
doctorRouters.get('/:id/reviews', validatedId, appointmentController.getMyAppointments);
doctorRouters.get('/:id/reviews', validatedId, appointmentController.getReviews);
//patch
doctorRouters.patch('/:id/appointments/:id/status', validatedId, appointmentController.updateAppointmentStatus);



export default doctorRouters;