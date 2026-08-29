import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRouters from './routes/authRouters';
import { notFoundHandler, errorHandler } from './mildware/errorHandler';
import userRouters from './routes/userRouters';
import departmentRouters from './routes/DepartmentRouters';
import doctorRouters from './routes/doctorRouters';
import timeSlotsRouters from './routes/timeSlotRoutes';
import historyRoutes from './routes/reviewRoutes';
import appointmentRouters from './routes/appointmentRouters';
import reviewRoutes from './routes/reviewRoutes';
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'OK' });
});

app.use('/api/v1/auth', authRouters);
app.use('/api/v1/users', userRouters);
app.use('/api/v1/department', departmentRouters);
app.use('/api/v1/doctor', doctorRouters);
app.use('/api/v1/appointments', appointmentRouters);


// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://locahost:${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
})
export default app;