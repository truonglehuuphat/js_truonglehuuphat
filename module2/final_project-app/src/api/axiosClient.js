import axios from "axios";

const api = axios.create(
    {
        baseURL: "https://fakestoreapi.com",
        headers: {
            "Content-Type": "applications/json",
        },
        timeout: 5000

    }
);

export default api;
