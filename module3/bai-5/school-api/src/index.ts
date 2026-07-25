import express  from 'express'
import studentRouters from './routes/studentRoutes.ts'

const PORT = 3000
const app = express();
app.use(express.json());
app.use("/api/v1/students", studentRouters);
app.listen(PORT, () => console.log("http://localhost:3000"))