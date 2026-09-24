import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type DoctorContextType = {
    id: number;
    name: string;
    title: string;
    thumbnail?: string;
    departmentName: string;
    departmentId: number;
    description: string;
};

type DoctorContextValue = {
    doctor: DoctorContextType[];
    setDoctor: (doctor: DoctorContextType) => void;
    isDoctorLoading: boolean;
};

const initialState: DoctorContextType[] = [
    {
        id: 0,
        title: "",
        name: "",
        thumbnail: "",
        departmentName: "",
        departmentId: 0,
        description: ""
    }
];


const STORAGE_KEY = "doctors";

const DoctorContext = createContext<DoctorContextValue | undefined>(undefined);

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
    const [doctor, setDoctorState] = useState<DoctorContextType[]>(initialState);
    const [isDoctorLoading, setIsDoctorLoading] = useState<boolean>(true);

    // Load dữ liệu từ sessionStorage khi ứng dụng khởi chạy
    useEffect(() => {
        const raw = sessionStorage.getItem(STORAGE_KEY);

        if (raw) {
            try {
                setIsDoctorLoading(true);
                const parsed = JSON.parse(raw);

                // Đảm bảo lấy đúng cấu trúc dữ liệu lưu trong sessionStorage
                setDoctorState(parsed);

            } catch (err) {
                console.error("Lỗi parse sessionStorage:", err);
                setIsDoctorLoading(false);
            }
        }

    }, []);

    // Hàm cập nhật User (được gọi ở các Component/Page khác)
    const setDoctor = (newDoctor: DoctorContextType) => {
        setDoctor(newDoctor);
        setIsDoctorLoading(true);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newDoctor));
    };

    return (
        <DoctorContext.Provider value={{ doctor, setDoctor, isDoctorLoading }}>
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