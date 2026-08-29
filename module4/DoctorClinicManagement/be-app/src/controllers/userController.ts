import { Request, Response, NextFunction } from "express";
import * as svc from '../services/userService';
import { buildMeta } from "../utils/pagination";


export async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.query as any;
        const { data, total } = await svc.findAll(query);
        res.json({
            success: true,
            data,
            mega: buildMeta(total, query.page, query.limit)
        });
    } catch (error) {
        next(error);
    }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await svc.findById(res.locals.id);
        res.json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.id;
        const userData = req.body as any;
        const user = await svc.updateProfile(userId, userData);
        res.json({ success: true, data: user })
    } catch (error) {
        next(error);
    }
}

export async function updateRole(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await svc.updateRole(res.locals.id, req.body.id, req.user!.id);
        res.json({ success: true, data: user })
    } catch (error) {
        next(error);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
        next(error);
    }
}