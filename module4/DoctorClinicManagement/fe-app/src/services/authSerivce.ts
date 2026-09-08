import axiosClient from "../api/axiosClient";

export interface LoginInterface {
    token: string;
    refreshToken: string;
}

export interface DataUser {
    userName: string;
    password: string;
}

// Hàm async phải trả về Promise<LoginInterface>
export async function getLogin(userInput: DataUser): Promise<LoginInterface> {
    try {
        const response = await axiosClient.post("/api/v1/login", userInput);

        // Trả về dữ liệu token nhận được từ API khi thành công
        return response.data;
    } catch (error: any) {
        // Xử lý khi response thất bại (VD: sai tài khoản/mật khẩu)
        throw {
            code: "P101",
            message: "Tên đăng nhập hoặc mật khẩu không chính xác",
            originalError: error?.response?.data || error.message
        };
    }
}