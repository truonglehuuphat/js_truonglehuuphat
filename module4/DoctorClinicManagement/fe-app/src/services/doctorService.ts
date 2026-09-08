import axios from "axios";
import axiosClient from "../api/axiosClient";
import type { DoctorInfo } from "../types/doctor";


export interface User {
  name: string;
  email: string;
  id: number;
}

export interface Department {
  name: string;
  id: number;
}

export interface RawDoctor {
  id: number;
  special: string;
  title: string;
  position: string;
  description: string;
  image: string;
  user: User;
  department: Department;
}

export interface Doctor {
  id: number;
  name: string;
  special: string;
  title: string;
  position: string;
  description: string;
  thumbnail: string;
  email: string
}


const normalizeDoctor = (item: RawDoctor): Doctor => ({
  id: item.id,
  name: item.user?.name,
  email: item.user?.email,
  title: item.title,
  special: item.department?.name,
  position: item.position,
  description: item.description,
  thumbnail: item.image,
});

// Define interface parameters
export interface GetDoctorsParams {
  speciality?: string;
  title?: string;
  position?: string;
  sortBy?: "position" | "title" | "";
  order?: "asc" | "desc";
  skip?: number;
  limit?: number;
}

// Response interface
export interface GetDoctorsResponse {
  doctors: DoctorInfo[];
  total: number;
  limit: number;
  skip: number;
}
const DEFAULT_LIMIT = 24

export const getAllDoctors = async (
  params: GetDoctorsParams & { signal?: AbortSignal } = {}
): Promise<GetDoctorsResponse> => {
  const {
    speciality = "all",
    title = "",
    position = "",
    sortBy = "",
    order = "asc",
    skip = 0,
    limit = DEFAULT_LIMIT,
    signal,
  } = params;


  // Endpoint tuỳ thuộc vào logic API backend của bạn
  const response = await axiosClient.get("/api/v1/doctor", {
    // params: { limit },
    // signal,
  });

  const rawDoctors = response.data?.data;

  let doctors: DoctorInfo[] = Array.isArray(rawDoctors)
    ? rawDoctors.map(normalizeDoctor) // Cần khai báo hàm normalizeDoctor nếu API trả về data thô
    : [];

  // Filter theo từ khoá tìm kiếm (Name, Title, Position)

  // Filter chính xác theo Title
  if (title !== "") {
    doctors = doctors.filter((d) => d.title.toLowerCase() === title.toLowerCase());
  }

  // Filter chính xác theo Position
  if (position !== "") {
    doctors = doctors.filter((d) => d.position.toLowerCase() === position.toLowerCase());
  }

  // Sắp xếp theo Position
  if (sortBy === "position") {
    doctors = [...doctors].sort((a, b) =>
      order === "desc"
        ? b.position.localeCompare(a.position)
        : a.position.localeCompare(b.position)
    );
  }

  // Sắp xếp theo Title
  if (sortBy === "title") {
    doctors = [...doctors].sort((a, b) =>
      order === "desc"
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title)
    );
  }

  return {
    doctors,
    total: doctors.length,
    limit,
    skip,
  };
};