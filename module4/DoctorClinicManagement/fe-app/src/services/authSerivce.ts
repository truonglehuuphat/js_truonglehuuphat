import axiosClient from "../api/axiosClient";


export interface User {
    id: number | string;
    name: string;
    role: string;
}

export interface LoginInterface {
    accessToken: string;
    refreshToken: string;
    user: User
}

export interface DataUser {
    email: string;
    password: string;
}

// Hàm async phải trả về Promise<LoginInterface>
export async function getLogin(userInput: DataUser): Promise<LoginInterface> {
    try {
        // console.log("DataUser", userInput);
        const response = await axiosClient.post("/api/v1/auth/login", userInput);
        if (response.status === 204) {
            console.log("Thao tác thành công nhưng không có dữ liệu trả về.");
            // return null;
        }
        // console.log("response", response);
        // Trả về dữ liệu token nhận được từ API khi thành công
        return response.data?.data;
    } catch (error: any) {
        // Xử lý khi response thất bại (VD: sai tài khoản/mật khẩu)
        console.log("Đã có lỗi xảy ra.");
        throw {
            code: "P101",
            message: "Tên đăng nhập hoặc mật khẩu không chính xác",
            originalError: error?.response?.data || error.message
        };
    }
}