import axiosClient from "../api/axiosClient";
import type { TimeSlot } from "../types/appointment";

enum DayOfWeek {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunda = "sunday"
}

export interface createTimeSlotDto {
  userId: number;
  doctorId: number;
  dayOfWeek: DayOfWeek.monday;
  date: string;       // ISO string or YYYY-MM-DD
  startTime: string;  // ISO string hoặc HH:mm
  endTime: string;    // ISO string hoặc HH:mm
}

export interface createTimeSlotResponseDto {
  date: string;
  timeType: string;
}

export const getAllDoctors = async () => {

}


export const createAppointment = async (data: createTimeSlotDto) => {
  try {
    const response = await axiosClient.post("/api/v1/appointments", data);
    return response.data?.data;
  } catch (error) {
    console.log("Đã có lỗi xảy ra khi tạo appointment");
  }
}