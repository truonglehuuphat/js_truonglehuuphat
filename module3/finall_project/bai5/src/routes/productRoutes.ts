import { Request, Response, NextFunction, Router } from 'express'
import { ApiResponse, Product } from "../types/types";
import { fileURLToPath } from 'url';
import { validate } from "../middleware/validate"
import { createProductSchema, updateProductSchema } from "../schemas/productSchema"

import fs from "fs";
import path from "path";
import { ServerResponse } from 'http';
import { AppError } from '../types/api';
import { ok } from '../unitls/helper';
import pool from '../db/pool';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const DATA_FILE = path.join(__filename, "../../../data/products.json");

function readProducts(): Product[] {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as Product[];
}

function sendJSON<T>(res: ServerResponse, statusCode: number, body: ApiResponse<T>): void {
    res.writeHead(statusCode, { "Content-type": "applicaiton/json" });
    res.end(JSON.stringify(body));
}

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let products = await pool.query("Select * FROM products");
        console.log(products.rows);
        ok(response, products.rows);
        // const { category, search } = request.query;
        // const page = Number(request.query.page) || 1;
        // const limit = Number(request.query.limit) || 10;
        // if (category) {
        //     products = products.filter((product) => product.category === category)
        // }
        // if (search) {
        //     products = products.filter((p) =>
        //         p.title.toLocaleLowerCase().includes((search as string).toLowerCase())
        //     );
        // }
        // const total = products.length;
        // const totalPages = Math.ceil(total / limit);
        // const data = products.slice((page - 1) * limit, page * limit);
        // response.json({ success: true, data, meta: { total, page, limit, totalPages } });
    }
    catch (err) {
        next(err);
    }
})

router.get("/categories", (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = readProducts();
        const categories = [...new Set(products.map((p) => p.category))];
        // res.json({ success: true, data: categories });
        ok(res, categories, 201);
    } catch (err) {
        next(err);
    }
})


router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = readProducts().find((p) => p.id === Number(req.params.id));
        if (!product) {
            // return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" })
            return next(new AppError(404, "Sản phẩm không tồn tại"));
        }
        // res.json({ success: true, data: product });
        ok(res, product);
    }
    catch (err) {
        next(err);
    }
})

router.post("/", validate(createProductSchema), (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = readProducts()
        const body = { id: products.length + 1, ...req.body };
        products.push(body);
        fs.writeFileSync(DATA_FILE, JSON.stringify(products), { encoding: "utf-8" });
        // res.status(201).json({ success: true, data: products });
        ok(res, products, 201);
    }
    catch (err) {
        next(err);
    }
})

router.put("/:id", validate(updateProductSchema), (req: Request, res: Response, next: NextFunction) => {
    try {
        let product = readProducts().find((p) => p.id === Number(req.params.id));
        if (!product) {
            // return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" })
            return next(new AppError(404, "Sản phẩm không tồn tại"));
        }
        let products = readProducts().map((item) => {
            if (item.id === Number(req.params.id)) {
                return {
                    ...item,
                    ...req.body,
                    id: item.id
                }
            }
            return item;
        })
        fs.writeFileSync(DATA_FILE, JSON.stringify(products), { encoding: "utf-8" });
        // res.status(201).json({ success: true, data: products });
        ok(res, products, 201);
    }
    catch (err) {
        next(err);
    }
})

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
    try {
        let product = readProducts().find((p) => p.id === Number(req.params.id));
        if (!product) {
            // return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" })
            return next(new AppError(404, "Không tìm thấy sản phẩm"));
        }
        let products = readProducts().filter((item) => {
            return item.id !== Number(req.params.id)
        })
        JSON.stringify(products);
        fs.writeFileSync(DATA_FILE, JSON.stringify(products), { encoding: "utf-8" });
        // res.status(204).json({ success: true, data: products });
        ok(res, products, 204);
    }
    catch (err) {
        next(err);
    }
})

export default router;