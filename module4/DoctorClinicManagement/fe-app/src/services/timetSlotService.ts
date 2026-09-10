// api/timeSlotApi.ts
import axiosClient from "../api/axiosClient";
import type { TimeSlot, TimeSlotParams } from "../types/timeSlots".

export const timeSlotApi = {
  /**
   * Lấy danh sách ca khám theo Doctor ID
   * @param doctorId ID của bác sĩ
   * @param params Bộ lọc tùy chọn (date, isBlocked)
   */
  getByDoctorId: async (doctorId: number, params?: TimeSlotParams): Promise<TimeSlot[]> => {
    const url = `/time-slots/doctor/${doctorId}`;
    
    // Gọi API với query parameters
    const response = await axiosClient.get(url, { params });
    return response.data;
  },
};