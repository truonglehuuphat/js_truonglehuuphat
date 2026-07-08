import { Router, Request, Response, NextFunction } from 'express'
import type { Book } from '../../types';

import fs from "fs"
import path from "path";
import { ServerResponse } from "http";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const DATA_FILE = path.join(__filename, "../../../data/books.json");

const router = Router();

function readBooks(): Book[] {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as Book[];
}

router.get("/", (request: Request, response: Response, next: NextFunction) => {
    try {
        let books = readBooks();
        const total = Number(books.length);
        const page = Number(request.query.page) || 1;
        const limit = Number(request.query.limit) || 10;
        const { genre, searchTitle, searchAuthor } = request.query;
        if (genre) {
            books.filter((item) =>
                item.genre.toLocaleLowerCase().includes((genre as string).toLowerCase())
            )
        }
        if (searchTitle) {
            books.filter((item) =>
                item.tilte.toLocaleLowerCase().includes((searchTitle as string).toLowerCase())
            );
        }
        if (searchAuthor) {
            books.filter((item) =>
                item.author.toLocaleLowerCase().includes((searchAuthor as string).toLowerCase())
            );
        }
        const totalPages = Math.ceil(total / limit);
        const data = books.slice((page - 1) * limit, page * limit);
        response.status(200).json({ success: true, data, meta: { total, page, limit, totalPages } })
    } catch (e) {
        next(e);
    }
})


router.get("/categories", (request: Request, response: Response, next: NextFunction) => {
    try {
        const books = readBooks();
        const categories = [...new Set(books.map((item) => item.genre))]
        response.status(201).json({ success: true, data: categories })
    } catch (e) {
        next(e)
    }
})

router.get("/:id", (request: Request, response: Response, next: NextFunction) => {
    try {
        const books = readBooks();
        const id = Number(request.params.id);
        const book = books.find((item) => item.id === id);
        if (!book) {
            response.status(404).json({ success: false, message: "Không tìm thấy quyển sách" })
        }
        response.status(201).json({ success: true, data: book })
    } catch (e) {
        next(e)
    }
})

router.post("/", (request: Request, response: Response, next: NextFunction) => {
    try {
        const books = readBooks();
        const requiredFields: (keyof Book)[] = ['id', 'tilte', 'author', 'genre', 'year']
        const body = { id: books.length + 1, ...request.body };
        const missingFields = requiredFields.filter((t) => !(t in body));
        if (missingFields.length > 0) {
            response.status(400).json({ success: false, data: missingFields })
            return
        }
        books.push(body);
        fs.writeFileSync(DATA_FILE, JSON.stringify(books), { encoding: "utf-8" });
        response.status(201).json({ success: true, data: books })
    } catch (e) {
        next(e)
    }
})

router.put("/:id", (request: Request, response: Response, next: NextFunction) => {
    try {
        let books = readBooks();
        const id = Number(request.params.id);
        const book = books.find((t) => t.id === id)
        if (!book) {
            response.status(404).json({ success: false, message: "Không tìm thấy quyển sách" })
            return
        }
        books = readBooks().map((item) => {
            if (item.id === Number(request.params.id)) {
                return {
                    ...item,
                    ...request.body,
                    id: item.id
                }
            }
            return item;
        })
        fs.writeFileSync(DATA_FILE, JSON.stringify(books), { encoding: "utf-8" });
        response.status(201).json({ success: true, data: books })
    } catch (e) {
        next(e)
    }
})

router.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
    try {
        let books = readBooks();
        const id = Number(request.params.id);
        const body = request.query.body;
        const book = books.find((t) => t.id === id)
        if (!book) {
            response.status(404).json({ success: false, message: "Không tìm thấy quyển sách" })
            return
        }
        books = readBooks().filter((item) => item.id !== Number(request.params.id));
        fs.writeFileSync(DATA_FILE, JSON.stringify(books), { encoding: "utf-8" });
        response.status(204).json({ success: true, data: books })
    } catch (e) {
        next(e)
    }
})

export default router;