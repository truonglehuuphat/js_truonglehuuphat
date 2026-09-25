
export enum Status {
  Pending,    // 0
  Confirmed,  // 1
  Cancelled   // 2
}

export enum  TimeType {
  morning = 'morning',
  afternoon = 'afternoon',
  evening = 'evening'
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
  id: number;
  doctorId: number;
  dayOfWeek: DayOfWeek.monday;
  date: string;       // ISO string or YYYY-MM-DD
  startTime: string;  // ISO string hoặc HH:mm
  endTime: string;    // ISO string hoặc HH:mm
  isBlocked: boolean;
  // session: "MORNING" | "AFTERNOON" | "EVENING";
  timeRange?: string;
  timeType?: TimeType;
}

export interface MeAppointment {
    userId: number,
    appointmentId: number,
    timeSlotId: number,
    startTime: Date,
    doctorName: string;
    department: string;
    description: string;
    date: Date;
    status: string;
    isBlocked: Boolean;
    comment: string;
}
