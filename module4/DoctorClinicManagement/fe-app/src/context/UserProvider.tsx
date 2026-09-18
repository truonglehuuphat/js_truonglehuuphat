import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type UserContextType = {
    id: number;
    name: string;
    accessToken: string;
    resfreshToken: string;
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
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

const STORAGE_KEY = "User";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<UserContextType>(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Load dữ liệu từ localStorage khi ứng dụng khởi chạy
    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                
                // Đảm bảo lấy đúng cấu trúc dữ liệu lưu trong LocalStorage
                setUserState(parsed.user ? { ...parsed.user, accessToken: parsed.accessToken } : parsed);
            } catch (err) {
                console.error("Lỗi parse localStorage:", err);
                setIsLoading(false);
            }
        }
        
    }, []);

    // Hàm cập nhật User (được gọi ở các Component/Page khác)
    const setUser = (newUser: UserContextType) => {
        setUserState(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    };

    // Hàm Đăng xuất
    const logout = () => {
        setUserState(initialState);
        localStorage.removeItem(STORAGE_KEY);
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