import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { AppError } from "../types/api"

declare global {
    namespace Express {
        interface Request {
            user?: { id: number; email: string; role: string; };
        }
    }
}


interface AccessTokenPayload {
    id: number;
    email: string;
    role: string;
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
    // take token from header
    const autheHeader = req.headers.authorization;
    console.log(autheHeader)
    if (!autheHeader || !autheHeader.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "Chưa đăng nhập" });
        return;
    }
    const token = autheHeader.split(" ")[1];
    try {
        // verify token
        const payload = jwt.verify(token, process. env.JWT_ACCESS_SECRET!) as AccessTokenPayload;
        // combine user and req  for route handler
        console.log("payload",payload)
        req.user = { id: payload.id, email: payload.email, role: payload.role, };
        console.log("req.user", req.user);
        next();
    } catch (error: any) {
         console.log("error",error)
        if (error.name === "TokenExpiredError") { 
            res.status(401).json({ success: false, message: "Token is expired" });
            return;
        }
        res.status(401).json({ success: false, message: "Token is invalid" });
    }
}