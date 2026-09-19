import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type DoctorContextType = {
    id: number;
    name: string;
    title: string;
    thumbnail:string;
    departmentName: string;
    departmentId: number;
    description: string;
};

type DoctorContextValue = {
    doctor: DoctorContextType[];
    setDoctor: (user: DoctorContextType) => void;
    isLoading: boolean;
};

const initialState: DoctorContextType = {
    id: 0,
    name: "",
    departmentName: "",
    description: ""
};


const STORAGE_KEY = "doctors";

const DoctorContext = createContext<DoctorContextValue | undefined>(undefined);

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
    const [doctor, setDoctorState] = useState<DoctorContextType>(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Load dữ liệu từ localStorage khi ứng dụng khởi chạy
    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (raw) {
            try {
                const parsed = JSON.parse(raw);

                // Đảm bảo lấy đúng cấu trúc dữ liệu lưu trong LocalStorage
                setDoctorState(parsed);
            } catch (err) {
                console.error("Lỗi parse localStorage:", err);
                setIsLoading(false);
            }
        }

    }, []);

    // Hàm cập nhật User (được gọi ở các Component/Page khác)
    const setDoctor = (newDoctor: DoctorContextType) => {
        setDoctor(newDoctor);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newDoctor));
    };

    return (
        <DoctorContext.Provider value={{ doctor, setDoctor, isLoading }}>
            {children}
        </DoctorContext.Provider>
    );
}

// Custom Hook an toàn
export const doctorContext = () => {
    const context = useContext(DoctorContext);
    if (!context) {
        throw new Error("Doctor phải được sử dụng bên trong <UserProvider>");
    }
    return context;
};