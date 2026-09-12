import prisma from '../db/prisma';
import { Prisma, Role, StatusAppointment } from "../generated/prisma/client";
import { AppError } from "../types/api";
import { buildSkip } from '../utils/pagination';

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

export async function getMyAppointments(
    appointmentId: number,
    status: StatusAppointment,
    requesterId: number,
    role: string) {

}



export async function getAppointments() {

}

export async function createAppointment(data: createTimeSlotDto) {
    // await prisma.appointment.create({data: {data}});
    console.log(data);
}

export async function updateStatus() {

}