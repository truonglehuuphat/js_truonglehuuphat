export interface ApiResponse< T = any> {
    success: boolean;
    data?: T;
    message?: String;
    errors?: Record<string, string>;
    meta?: PagniationMeta
}

export interface PagniationMeta {
    total: number;
    limit: number;
    page: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export class AppError extends Error {
    constructor(
        public statuscode: number,
        message: string,
        public code?: string
    ){
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}