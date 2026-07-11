import { Response, Request, Router, NextFunction } from "express";
import fs from "fs";
import { ServerResponse } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { AppError } from "../types/api";
import { validate } from "../middleware/validate";
import { createPostSchema, updatePostSchema } from "../schemas/postSchema";

const __filename = fileURLToPath(import.meta.url);
const DATA_FILE = path.join(__filename, "../../../data/data.json")

function readData(): any {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"))
}

const router = Router();
let posts = readData();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { category, sort, order } = req.query as Record<string, string>
    let result = [...posts];
    if (category) result = result.filter((t) => t.category === category)
    if (sort) {
        result.sort((a, b) => {
            const cmp = typeof a[sort] === "number" ?
                a[sort] - b[sort] :
                String(a[sort].localeCompare(String(b[sort])));
            return order === "desc" ? -cmp : cmp;
        });
    }
    const total = result.length;
    const data = result.slice((page - 1) * limit, page * limit);

    res.json({
        success: true,
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
});

router.get("/:id", (req, res, next) => {
    const post = posts.find((t) => t.id === Number(req.params.id));
    if (!post) return next(new AppError(404, "Bài viết không tồn tại"));
    res.json({ success: true, data: post });
})

router.post("/", validate(createPostSchema), (req, res, next) => {
    const newPost = { id:nextId++, ...req.body };
    posts.push(newPost);
    res.status(201).json({ success: true, data: newPost, message: "Tạo bài viết thành công" });
})

router.put("/id", (req, res, next) => {
    const post = posts.some(p => p.id === Number(req.query.id));
    if (!post) return next(new AppError(404, "Bài viết không tại"));
    Object.assign(post, req.body);
    res.json({ success: true, data: post, message: "Cập nhật thành công" });
})

router.delete("/id", (req, res, next) => {
    const exists = posts.some(p => p.id === Number(req.query.id));
    if (!exists) return next(new AppError(404, "Bài viết không tại"));
    posts = posts.filter((t) => t.id !== Number(req.params.id));
    res.status(204).send();
})

router.patch("/id", validate(updatePostSchema), (req, res, next) => {
    const post = posts.some(p => p.id === Number(req.query.id));
    if (!post) return next(new AppError(404, "Bài viết không tại"));
    Object.assign(post, req.body);
    res.json({ success: true, data: post, message: "Cập nhật thành công" });
})
export default router;