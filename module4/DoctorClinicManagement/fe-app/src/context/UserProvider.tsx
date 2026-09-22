import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export type UserContextType = {
    id: number;
    name: string;
    accessToken: string;
    resfreshToken: string;
    role: string;
};

type UserContextValue = {
    user: UserContextType;
    setUser: (user: UserContextType) => void;
    logout: () => void;
    isLoading: boolean;
};

const initialState: UserContextType = {
    id: 0,
    name: "",
    accessToken: "",
    resfreshToken: "",
    role: ""
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

const STORAGE_KEY = "User";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<UserContextType>(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const navigate = useNavigate();
    // Load dữ liệu từ sessionStorage khi ứng dụng khởi chạy
    useEffect(() => {
        const raw = sessionStorage.getItem(STORAGE_KEY);

        if (raw) {
            try {
                const parsed = JSON.parse(raw);

                // Đảm bảo lấy đúng cấu trúc dữ liệu lưu trong sessionStorage
                setUserState(parsed);
            } catch (err) {
                console.error("Lỗi parse sessionStorage:", err);
                setIsLoading(false);
            }
        }

    }, []);

    useEffect(() => {
        // 1. Tải dữ liệu từ localStorage khi ứng dụng mount
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                setUserState(JSON.parse(raw));
            } catch (err) {
                console.error(err);
            }
        }

        // 2. Lắng nghe sự kiện tắt/đóng tab
        const handleUnload = () => {
            localStorage.removeItem(STORAGE_KEY);
        };

        window.addEventListener("beforeunload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, []);

    // Hàm cập nhật User (được gọi ở các Component/Page khác)
    const setUser = (newUser: UserContextType) => {
        setUserState(newUser);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    };

    // Hàm Đăng xuất
    const logout = () => {
        setUserState(initialState);
        sessionStorage.removeItem(STORAGE_KEY);
        // navigate('/');
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

// Custom Hook an toàn
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser phải được sử dụng bên trong <UserProvider>");
    }
    return context;
};