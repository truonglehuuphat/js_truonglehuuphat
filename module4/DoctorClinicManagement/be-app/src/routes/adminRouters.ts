import { Router } from 'express'
import { authenticate } from '../mildware/authenticate';
import { validate, validatedId, validateQuery } from '../mildware/validate';
import { updateProfileSchema, updateRoleSchema, userQuerySchema } from '../schema/userSchema';
import * as doctorController from '../controllers/doctorController';
import * as userController from '../controllers/userController';
import * as reviewController from '../controllers/reviewController';
import * as timeslotController from '../controllers/timeslotController';
import * as appointmentController from '../controllers/appointmentsController';
import * as departmentController from '../controllers/departmentController';
import { authorize } from '../mildware/authorize';
import { authorizeOwner } from '../mildware/authorizeOwner';

const adminRouters = Router();

adminRouters.use(authenticate, authorize('ADMIN'));

//Doctor
adminRouters.get('/doctor/', doctorController.getDoctors);
adminRouters.post('/doctor/', doctorController.createDoctor);
adminRouters.patch('/doctor/', doctorController.updateProfile);
adminRouters.delete('/doctor/', doctorController.deleteDoctor);

//patient
adminRouters.get('/patient/', userController.getUsers);
// adminRouters.post('/patient/', userController.createDoctor);
adminRouters.patch('/patient/', userController.updateProfile);
adminRouters.delete('/patient/', userController.deleteUser);

//department
adminRouters.get('/department/', departmentController.getAllDepartment);
adminRouters.post('/department/', departmentController.create);
adminRouters.patch('/department/', departmentController.updateById);
adminRouters.delete('/department/', departmentController.deleteById);

//appointment
adminRouters.get('/appointment/', appointmentController.getAllAppointments);
adminRouters.patch('/appointment/', appointmentController.updateAppointmentStatus);

//dashboard
// adminRouters.patch('/dashboard/', appointmentController.updateAppointmentStatus);


export default adminRouters;