import type { Response } from "express"

export const Ok= <T>(res: Response, data:T, statusCode = 200) => {
    const result ={
        data: data,
        success: true,
        message: "Success!"
    }
    return res.status(statusCode).json(data);
}