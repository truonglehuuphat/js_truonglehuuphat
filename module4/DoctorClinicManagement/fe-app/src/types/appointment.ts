


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