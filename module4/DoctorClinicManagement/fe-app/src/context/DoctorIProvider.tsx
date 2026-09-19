import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAllDoctors, getAllDepartments } from '../services/apiService'; // Đường dẫn đến hàm call API của bạn

export interface Doctor {
  id: number;
  name: string;
  departmentId: number;
  specialty?: string;
  description: string;
}

export interface Department {
  id: number;
  name: string;
  description?: string;
}

interface DoctorContextType {
  doctors: Doctor[];
  departments: Department[];
  isLoading: boolean;
  error: string | null;
  refetchData: () => Promise<void>; // Hàm cho phép refresh chủ động khi cần
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Gọi đồng thời cả 2 API để tiết kiệm thời gian load
      const [doctorsData, departmentsData] = await Promise.all([
        getAllDoctors(),
        getAllDepartments()
      ]);

      setDoctors(doctorsData?.data || doctorsData || []);
      setDepartments(departmentsData?.data || departmentsData || []);
    } catch (err: any) {
      console.error("Lỗi khi tải dữ liệu Doctor/Depart:", err);
      setError("Không thể tải thông tin bác sĩ và khoa phòng.");
    } finally {
      setIsLoading(false);
    }
  };

  // Tự động chạy khi ứng dụng/provider mount lần đầu
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        departments,
        isLoading,
        error,
        refetchData: fetchData,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

// Custom Hook để tiêu thụ Context
export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctor phải được dùng bên trong <DoctorProvider>');
  }
  return context;
};