
export interface TimeSlotParams {
  date?: string; // Format YYYY-MM-DD
  isBlocked?: boolean;
}

export interface TimeSlot {
  id: number;
  doctorId: number;
  dayOfWeek: string;
  date: string;
  startTime: string;
  endTime: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  doctor?: {
    user?: {
      name: string;
      email: string;
      phone: string;
    };
    department?: {
      name: string;
    };
  };
}