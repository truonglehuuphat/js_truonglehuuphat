


export enum TimeType {
  morning,
  afternoon,
  evening,
}

export enum Status {
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
  session: "MORNING" | "AFTERNOON" | "EVENING";
  timeRange: string;
  isBooked: boolean;
}

enum DayOfWeek {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunda = "sunday"
}

export interface TimeSlot {
  doctorId: number;
  dayOfWeek: DayOfWeek.monday;
  date: string;       // ISO string or YYYY-MM-DD
  startTime: string;  // ISO string hoặc HH:mm
  endTime: string;    // ISO string hoặc HH:mm
  isBlocked: boolean;
  session: "MORNING" | "AFTERNOON" | "EVENING";
  timeRange: string;
}