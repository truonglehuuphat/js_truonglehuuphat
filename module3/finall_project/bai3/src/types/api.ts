
export interface ApiRespone<T>{
    success: boolean,
    data: T,
    message?: string,
    error? : {field: string; message: string}
    meta?: {total: number; page: number; limit: number; totalPages: number}
}

export class AppError extends Error {
    constructor(public statusCode: number, message: string){
        super(message);
        this.name = "AppError";
    }
}