import express from 'express';
import BookRouters from "./src/routes/BookRouters";

const PORT = 3000
const app = express();

app.use(express.json());

app.use("/books", BookRouters);

app.listen(PORT, () => console.log("http://localhost:3000"))