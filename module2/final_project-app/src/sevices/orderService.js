import axios from "axios";

export const createOrder = async (cartItems) => {
    const response = axios.post("https://jsonplaceholder.typicode.com/posts", cartItems);
    return response.data;
}