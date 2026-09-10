


export enum TimeType {
  morning,
  afternoon,
  evening,
}

export  enum Status {
    Pending,    // 0
    Confirmed,  // 1
    Cancelled   // 2
}

export interface AppointmentInfo {
    userId: number;
    doctorId: number;
    date: Date;
    status: string;
    description: string;
}

export interface GetAppointmentResponse {
  appointment: AppointmentInfo[];
  total: number;
  limit: number;
  skip: number;
}

export interface WorkShift {
  id: string;
  date: string; // YYYY-MM-DD
  session: "MORNING" | "AFTERNOON";
  timeRange: string;
  isBooked: boolean;
}

export interface TimeSlot {
  id: number;
  doctorId: number;
  dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  date: string;       // ISO string or YYYY-MM-DD
  startTime: string;  // ISO string hoặc HH:mm
  endTime: string;    // ISO string hoặc HH:mm
  isBlocked: boolean;
}