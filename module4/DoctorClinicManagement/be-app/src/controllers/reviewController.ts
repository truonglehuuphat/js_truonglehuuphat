import { Request, Response, NextFunction, Router } from 'express'
import { authenticate } from '../mildware/authenticate';
import { validate, validatedId, validateQuery } from '../mildware/validate';
import { updateProfileSchema, updateRoleSchema, userQuerySchema } from '../schema/userSchema';
import * as svc from '../services/historyService';
import { authorize } from '../mildware/authorize';
import { authorizeOwner } from '../mildware/authorizeOwner';


export async function getReviews(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
        next();
    }
}

export async function createReview(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
        next();
    }
}