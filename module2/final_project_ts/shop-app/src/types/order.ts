import type { CheckoutFormData } from "../schemas/checkoutSchema";

export interface OrderItem{
    productId: number;
    quantity: number;
    price: number;
}

export interface CreateOrderPayLoad {
    products: OrderItem[],
    formData: CheckoutFormData;
}

export interface OrderResponse {
    id: number,
    customerId: number,
    products: OrderItem[],
    status: string
}