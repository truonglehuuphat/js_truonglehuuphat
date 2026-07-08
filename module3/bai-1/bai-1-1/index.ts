export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
    description: string;
    rating: number;
    ratingCount: number;
    brand: string;
    stock: number;
}

export interface ApiResponse<T>{
    success: boolean;
    data?: T;
    message: string;
}