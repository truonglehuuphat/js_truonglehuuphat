export interface ApiResponse<T>{
    data?:T,
    success: boolean,
    message?: string
    error?: {field?: string, message: String}[];
    meta?: {total: number; page: number, limit: number, totalPages: number};
}

export class AppError extends Error {
    constructor(public statusCode: number, message: string){
        super(message);
    }
}