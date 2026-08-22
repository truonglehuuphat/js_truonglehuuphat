import 'dotenv/config';
import express  from 'express'
import studentRouters from './routes/studentRoutes.ts'
import classRouters from './routes/classRouters.ts';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.ts';
import statusRouter from './routes/statusRouters.ts';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//health
app.get('/health', (req, res)=> {
    res.json({success: true, message: 'OK'})
});
app.use("/api/v1/students", studentRouters);
app.use("/api/v1/classes", classRouters);
app.use("/api/v1/status", statusRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
})
