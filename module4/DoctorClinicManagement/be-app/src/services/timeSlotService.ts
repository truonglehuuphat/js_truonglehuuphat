import prisma from '../db/prisma';
import { DayOfWeek, Prisma, Role } from "../generated/prisma/client";
import { AppError } from "../types/api";
import { buildSkip } from '../utils/pagination';

// Include chuẩn để lấy thông tin Bác sĩ kèm Khoa và User
const TIME_SLOT_INCLUDE = {
    doctor: {
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
            department: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    },
} as const;

export interface CreateTimeSlotDto {
    doctorId: number;
    dayOfWeek: DayOfWeek;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    isBlocked?: boolean;
}

export interface UpdateTimeSlotDto {
    dayOfWeek?: DayOfWeek;
    date?: Date | string;
    startTime?: Date | string;
    endTime?: Date | string;
    isBlocked?: boolean;
}

export async function findAll(query: {
    doctorId?: number;
    date?: string;
    dayOfWeek?: DayOfWeek;
    isBlocked?: boolean | string;
    page?: number;
    limit?: number;
}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const where: Prisma.timeSlotWhereInput = {};

    if (query.doctorId) {
        where.doctorId = Number(query.doctorId);
    }

    if (query.dayOfWeek) {
        where.dayOfWeek = query.dayOfWeek;
    }

    if (query.isBlocked !== undefined) {
        where.isBlocked = query.isBlocked === 'true' || query.isBlocked === true;
    }

    if (query.date) {
        where.date = new Date(query.date);
    }

    const [data, total] = await prisma.$transaction([
        prisma.timeSlot.findMany({
            where,
            include: TIME_SLOT_INCLUDE,
            orderBy: [
                { date: 'asc' },
                { startTime: 'asc' },
            ],
            take: limit,
            skip: buildSkip(page, limit),
        }),
        prisma.timeSlot.count({ where }),
    ]);

    return { data, total };
}

export async function findAllByDoctorId(
    doctorId: number,
    query?: { date?: string; isBlocked?: boolean | string }
) {
    const doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
    });

    if (!doctor) {
        throw new AppError(404, "Bác sĩ không tồn tại");
    }

    const where: Prisma.timeSlotWhereInput = { doctorId };

    if (query?.date) {
        where.date = new Date(query.date);
    }

    if (query?.isBlocked !== undefined) {
        where.isBlocked = query.isBlocked === 'true' || query.isBlocked === true;
    }

    return prisma.timeSlot.findMany({
        where,
        include: TIME_SLOT_INCLUDE,
        orderBy: [
            { date: 'asc' },
            { startTime: 'asc' },
        ],
    });
}

export async function createTimeSlot(data: CreateTimeSlotDto) {
    const doctor = await prisma.doctor.findUnique({
        where: { id: data.doctorId },
    });

    if (!doctor) {
        throw new AppError(404, "Bác sĩ không tồn tại");
    }

    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);

    if (startTime >= endTime) {
        throw new AppError(400, "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc");
    }

    // Kiểm tra trùng lặp thời gian khám của bác sĩ
    const overlappingSlot = await prisma.timeSlot.findFirst({
        where: {
            doctorId: data.doctorId,
            date: new Date(data.date),
            OR: [
                {
                    startTime: { lte: startTime },
                    endTime: { gt: startTime },
                },
                {
                    startTime: { lt: endTime },
                    endTime: { gte: endTime },
                },
            ],
        },
    });

    if (overlappingSlot) {
        throw new AppError(409, "Ca khám bị trùng thời gian với ca khám đã có");
    }

    return prisma.timeSlot.create({
        data: {
            doctorId: data.doctorId,
            dayOfWeek: data.dayOfWeek,
            date: new Date(data.date),
            startTime,
            endTime,
            isBlocked: data.isBlocked ?? false,
        },
        include: TIME_SLOT_INCLUDE,
    });
}

export async function updateTimeSlot(id: number, data: UpdateTimeSlotDto) {
    const existingSlot = await prisma.timeSlot.findUnique({
        where: { id },
    });

    if (!existingSlot) {
        throw new AppError(404, "Ca khám không tồn tại");
    }

    const newStartTime = data.startTime ? new Date(data.startTime) : existingSlot.startTime;
    const newEndTime = data.endTime ? new Date(data.endTime) : existingSlot.endTime;

    if (newStartTime >= newEndTime) {
        throw new AppError(400, "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc");
    }

    // Nếu thay đổi thời gian, kiểm tra xung đột với ca khám khác
    if (data.startTime || data.endTime || data.date) {
        const targetDate = data.date ? new Date(data.date) : existingSlot.date;

        const overlappingSlot = await prisma.timeSlot.findFirst({
            where: {
                doctorId: existingSlot.doctorId,
                date: targetDate,
                NOT: { id },
                OR: [
                    {
                        startTime: { lte: newStartTime },
                        endTime: { gt: newStartTime },
                    },
                    {
                        startTime: { lt: newEndTime },
                        endTime: { gte: newEndTime },
                    },
                ],
            },
        });

        if (overlappingSlot) {
            throw new AppError(409, "Ca khám mới trùng thời gian với ca khám khác của bác sĩ");
        }
    }

    return prisma.timeSlot.update({
        where: { id },
        data: {
            ...(data.dayOfWeek && { dayOfWeek: data.dayOfWeek }),
            ...(data.date && { date: new Date(data.date) }),
            ...(data.startTime && { startTime: new Date(data.startTime) }),
            ...(data.endTime && { endTime: new Date(data.endTime) }),
            ...(data.isBlocked !== undefined && { isBlocked: data.isBlocked }),
        },
        include: TIME_SLOT_INCLUDE,
    });
}
export async function remove(id: number) {
    const existingSlot = await prisma.timeSlot.findUnique({
        where: { id },
    });

    if (!existingSlot) {
        throw new AppError(404, "Ca khám không tồn tại");
    }

    await prisma.timeSlot.delete({
        where: { id },
    });

    return {
        message: "Xóa ca khám thành công",
    };
}

