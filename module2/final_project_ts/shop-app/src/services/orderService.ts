import axios from 'axios'
import type { CreateOrderPayLoad, OrderResponse } from "../types/order";

export const createOrder = async (payload: CreateOrderPayLoad): Promise<OrderResponse> => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", payload);
    return response.data;
}