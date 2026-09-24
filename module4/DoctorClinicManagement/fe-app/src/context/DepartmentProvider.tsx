import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type DepartContextType = {
    id: number;
    name: string;
    departmentName: string;
};

type DepartContextValue = {
    depart: DepartContextType[];
    setDepart: (user: DepartContextType) => void;
    isDepartLoading: boolean;
};

const initialState: DepartContextType[] = [
    {
        id: 0,
        name: "",
        departmentName: ""
    }
];


const STORAGE_KEY = "department";

const DepartContext = createContext<DepartContextValue | undefined>(undefined);

export const DepartProvider = ({ children }: { children: ReactNode }) => {
    const [depart, setDepartState] = useState<DepartContextType[]>(initialState);
    const [isDepartLoading, setIsDepartLoading] = useState<boolean>(true);

    // Load dữ liệu từ sessionStorage khi ứng dụng khởi chạy
    useEffect(() => {
        const raw = sessionStorage.getItem(STORAGE_KEY);

        if (raw) {
            try {
                const parsed = JSON.parse(raw);

                // Đảm bảo lấy đúng cấu trúc dữ liệu lưu trong sessionStorage
                setDepartState(parsed);
            } catch (err) {
                console.error("Lỗi parse sessionStorage:", err);
                setIsDepartLoading(false);
            }
        }

    }, []);

    // Hàm cập nhật User (được gọi ở các Component/Page khác)
    const setDepart = (newDepart: DepartContextType) => {
        setDepart(newDepart);
        setIsDepartLoading(true)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newDepart));
    };

    return (
        <DepartContext.Provider value={{ depart, setDepart, isDepartLoading }}>
            {children}
        </DepartContext.Provider>
    );
}

// Custom Hook an toàn
export const departContext = () => {
    const context = useContext(DepartContext);
    if (!context) {
        throw new Error("Department phải được sử dụng bên trong <UserProvider>");
    }
    return context;
};