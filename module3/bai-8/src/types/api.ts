export interface ApiRespone<T>{
    success: boolean,
    data: T,
    message?:string,
    error?: Record<string,string>;
    meta?: PaginationMeta
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export class AppError extends Error {
    constructor(
        public statusCode : number,
        message: string,
        public code?: string
    ){
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
