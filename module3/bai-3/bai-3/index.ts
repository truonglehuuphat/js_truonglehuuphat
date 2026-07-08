import express from 'express';
import product from './src/router/product';


const PORT = 3000
const app = express();

app.use(express.json());

app.use("/product", product);

app.listen(PORT, () => console.log("http://localhost:3000"))