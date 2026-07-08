import express from 'express'
import { logger } from "./src/middleware/logger";
import productRouters from "./src/routes/productRoutes";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/products", productRouters);

app.listen(3000, () => console.log("http://localhost:3000"));
