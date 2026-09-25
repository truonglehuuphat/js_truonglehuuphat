import axiosClient from "../api/axiosClient";
import type { TimeSlot, TimeType } from "../types/appointment";
import type { UserInfo } from "../types/user";

enum DayOfWeek {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunda = "sunday"
}

export interface deleteTimeSlotDto {
  userId: number;
  appointmentId: number;
  timeSlotId: number;
  date: Date;       // ISO string or YYYY-MM-DD
  startTime: Date;  // ISO string hoặc HH:mm
}


export interface createTimeSlotDto {
  userId: number;
  doctorId: number;
  timeSlotId: number;
  dayOfWeek: DayOfWeek.monday;
  date: string;       // ISO string or YYYY-MM-DD
  timeType: TimeType;
  startTime: string;  // ISO string hoặc HH:mm
  endTime: string;    // ISO string hoặc HH:mm
  description?: string;
}

export interface createTimeSlotResponseDto {
  date: string;
  timeType: string;
}

export const getAllAppointmentById = async (signal?: AbortSignal) => {
  // 1. Lấy chuỗi thô từ sessionStorage
  const rawUser = sessionStorage.getItem('User');
  let token = "";
  if (rawUser) {
    try {
      // 2. Parse từ chuỗi JSON sang Object với kiểu UserInfo
      const user = JSON.parse(rawUser) as UserInfo;
      token = user.accessToken;

    } catch (e) {
      console.error("Lỗi parse dữ liệu User từ sessionStorage", e);
      return;
    }
  } else {
    console.log("Không tìm thấy thông tin User trong sessionStorage");
    return;
  }

  try {
    console.log("goi api");
    const response = await axiosClient.get("/api/v1/appointments/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      }, signal
    });
    console.log("response", response);
    return response;
  } catch (error: any) {
    // Nếu request bị hủy bởi AbortController thì throw tiếp để useEffect bắt
    if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
      throw error;
    }
    console.log("Đã có lỗi xảy ra khi tạo appointment");
    if (error.response?.status === 401) {
      console.error('Lỗi 401: Vui lòng đăng nhập lại.');
    }
  }
}


export const createAppointment = async (data: createTimeSlotDto) => {
  // 1. Lấy chuỗi thô từ sessionStorage
  const rawUser = sessionStorage.getItem('User');

  let token = "";
  if (rawUser) {
    try {
      // 2. Parse từ chuỗi JSON sang Object với kiểu UserInfo
      const user = JSON.parse(rawUser) as UserInfo;
      token = user.accessToken;
      console.log("token", token);
    } catch (e) {
      console.error("Lỗi parse dữ liệu User từ sessionStorage", e);
      return;
    }
  } else {
    console.log("Không tìm thấy thông tin User trong sessionStorage");
    return;
  }
  // 3. Tiến hành gọi API
  try {
    console.log("data", data)
    const response = await axiosClient.post("/api/v1/appointments", data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data?.data;
  } catch (error: any) {
    console.log("Đã có lỗi xảy ra khi tạo appointment");
    if (error.response?.status === 401) {
      console.error('Lỗi 401: Vui lòng đăng nhập lại.');
    }
  }
}

export const deleteAppointment = async (data: deleteTimeSlotDto) => {
  const rawUser = sessionStorage.getItem('User');

  let token = "";
  if (rawUser) {
    try {
      // 2. Parse từ chuỗi JSON sang Object với kiểu UserInfo
      const user = JSON.parse(rawUser) as UserInfo;
      token = user.accessToken;
      console.log("token", token);
    } catch (e) {
      console.error("Lỗi parse dữ liệu User từ sessionStorage", e);
      return;
    }
  } else {
    console.log("Không tìm thấy thông tin User trong sessionStorage");
    return;
  }

  // 3. Tiến hành gọi API
  try {
    
    const response = await axiosClient.delete("/api/v1/appointments/me", 
      { 
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response.data?", response.data);
    return response.data?.data;
  } catch (error: any) {
    console.log("Đã có lỗi xảy ra khi tạo appointment");
    if (error.response?.status === 401) {
      console.error('Lỗi 401: Vui lòng đăng nhập lại.');
    }
  }

}