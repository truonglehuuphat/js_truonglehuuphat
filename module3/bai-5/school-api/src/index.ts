import express  from 'express'
import studentRouters from './routes/studentRoutes.ts'
import classRouters from './routes/classRouters.ts';

const PORT = 3000
const app = express();
app.use(express.json());
app.use("/api/v1/students", studentRouters);
app.use("/api/v1/class", classRouters);

app.listen(PORT, () => console.log("http://localhost:3000"))