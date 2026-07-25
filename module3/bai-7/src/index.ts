import express from "express";
import postRouters from "./router/postRouters"
import { errorHandler } from "./middleware/errorHandler";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/v1/posts", postRouters);
app.use(errorHandler);

app.listen(3000, ()=> console.log("http:localhost:3000"));