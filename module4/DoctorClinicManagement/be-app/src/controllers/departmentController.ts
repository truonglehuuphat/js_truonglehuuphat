import { Request, Response, NextFunction } from 'express';
import * as svc from "../services/departmentService";
import { buildMeta } from '../utils/pagination';

export async function getAllDepartment(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.query as any;
        const { data, total } = await svc.findAll(query);
        res.json({
            success: true,
            data,
            mega: buildMeta(total, query.page, query.limit)
        })
    } catch (error) {
        next(error)
    }
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await svc.create(req.body);

        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }

}

export async function updateById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id as string);
        const body = req.body;
        const data = await svc.updateById(id, body);

        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id as string);
        const data = await svc.remove(id);
        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
}
