import axiosClient from "../api/axiosClient";

export const getDepartments = async () => {
    // Endpoint tuỳ thuộc vào logic API backend của bạn
    const response = await axiosClient.get("/api/v1/department", {
        // params: { limit },
        // signal,
    });
    console.log(response.data?.data);
    return response.data?.data;
}