import prisma from '../db/prisma';
import { Prisma, Role, StatusAppointment } from "../generated/prisma/client";
import { AppError } from "../types/api";
import { buildSkip } from '../utils/pagination';

export async function getMyAppointments(
    appointmentId: number,
    status: StatusAppointment,
    requesterId: number,
    role: string) {

}

export async function getAppointments() {

}

export async function createAppointment() {

}

export async function updateStatus() {

}