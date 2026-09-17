import prisma from '../db/prisma';
import { Prisma, Role, StatusAppointment, TimeType } from "../generated/prisma/client";
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
  timeSlotId: number;
  dayOfWeek: DayOfWeek.monday;
  date: string;       // ISO string or YYYY-MM-DD
  timeType: TimeType;
  startTime: string;  // ISO string hoặc HH:mm
  endTime: string;    // ISO string hoặc HH:mm
}

export async function getAllAppointmentsById(userId: number) {
  // kiểm tra userId có tồn tại không?
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) {
    throw new AppError(404, "Thông tin bệnh nhân không tồn tại");
  }
  const data = await prisma.appointment.findMany({
    where: { userId: userId },
    include: {
      doctor: true, // Bao gồm thông tin bác sĩ
    },
    orderBy: {
      createdAt: 'desc', // Sắp xếp lịch hẹn mới nhất lên đầu
    },
  })
  // console.log(data);
  return data;
}

export async function getAppointments() {

}

export async function create(data: createTimeSlotDto) {
  //kiểm tra người dùng có tồn tại không?
  // 1. Kiểm tra User (Bệnh nhân) và Doctor đồng thời để tối ưu hiệu năng
  const [userInfo, doctorInfo] = await Promise.all([
    prisma.user.findUnique({
      where: { id: data.userId },
    }),
    prisma.doctor.findUnique({
      where: { id: data.doctorId },
      include: { user: true }, // Join bảng User để lấy thông tin chi tiết bác sĩ
    }),
  ]);

  if (!userInfo || !doctorInfo) {
    throw new AppError(404, "Thông tin bác sĩ hoặc bệnh nhân không tồn tại");
  }

  // 2. Tìm chính xác TimeSlot dựa trên timeSlotId và doctorId
  const timeSlot = await prisma.timeSlot.findFirst({
    where: {
      id: data.timeSlotId,
    },
  });

  if (!timeSlot) {
    throw new AppError(404, "Khung giờ khám không tồn tại hoặc không thuộc bác sĩ này");
  }

  // 3. Kiểm tra xem TimeSlot đã bị khóa (đã được đăng ký) chưa
  if (timeSlot.isBlocked) {
    throw new AppError(400, "Khung giờ này đã bị khóa hoặc đã được người khác đặt");
  }

  // 4. Thực thi Transaction: Tạo Appointment và Cập nhật isBlocked = true cho TimeSlot
  const result = await prisma.$transaction(async (tx) => {
    // Đánh dấu khung giờ là đã bị block
    await tx.timeSlot.update({
      where: { id: timeSlot.id },
      data: { isBlocked: true },
    });

    // Tạo lịch hẹn mới
    const newAppointment = await tx.appointment.create({
      data: {
        userId: data.userId,
        doctorId: data.doctorId,
        timeSlotId: timeSlot.id,
        date: data.date,
        timeType: data.timeType,
        status: "Active" // Trạng thái mặc định ban đầu
      },
      include: {
        user: true,
        doctor: {
          include: { user: true },
        },
        timeSlot: true,
      },
    });

    return newAppointment;
  });

  return result;
}

export async function updateStatus() {

}