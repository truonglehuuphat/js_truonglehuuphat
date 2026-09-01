import prisma from '../db/prisma';
import { Prisma, Role } from "../generated/prisma/client";
import { AppError } from "../types/api";
import { buildSkip } from '../utils/pagination';

const USER_SELECT = {
    id: true,
    name: true,
    email: true,
    role: true,
    createdAt: true,
    updatedAt: true,
} as const;

interface UpdateDoctorDto {
    fullName?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    status?: "active" | "inactive";
    departmentId?: number | null;
}

export async function findAll(query: {
    role?: string,
    search?: string,
    status?: string,
    page: number,
    limit: number
}
) {
    const { role, search, status, page, limit } = query;

    const userWhere: Prisma.UserWhereInput = {};
    if (role) {
        userWhere.role = 'doctor'; // hoặc ép kiểu chuẩn Enum của Prisma
    }

    if (search) {
        userWhere.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
        ]
    }

    // Ghép vào DoctorWhereInput
    const where: Prisma.DoctorWhereInput = {
        ...(status && { status: status as any }),
        // Chỉ thêm quan hệ 'user' nếu có điều kiện role hoặc search
        ...(Object.keys(userWhere).length > 0 && { user: userWhere }),
    };

    const [data, total] = await prisma.$transaction([
        prisma.doctor.findMany({
            where,
            include: {
                user: {
                    select: USER_SELECT,
                },
                department: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: buildSkip(page, limit),
        }),
        prisma.doctor.count({ where }),
    ]);

    return { data, total };

}

export async function findById(id: number) {
    const doctor = await prisma.doctor.findUnique({
        where: { id },
        include: {
            user: {
                select: USER_SELECT,
            },
            department: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    if (!doctor) throw new AppError(404, 'Bác sĩ không tồn tại');
    return doctor;
}

export async function updateProfile(targetId: number, data: UpdateDoctorDto, requesterId: number) {

    const doctor = await prisma.doctor.findUnique({
        where: { id: targetId },
        include: { user: true },
    });

    if (!doctor) {
        throw new AppError(404, "Bác sĩ không tồn tại");
    }

    // Nếu không phải chủ tài khoản thì từ chối
    if (doctor.userId !== requesterId) {
        throw new AppError(403, "Bạn không có quyền cập nhật hồ sơ này");
    }

    // Kiểm tra email trùng (nếu có đổi email)
    if (data.email) {
        const existed = await prisma.user.findFirst({
            where: {
                email: data.email,
                NOT: { id: doctor.userId! },
            },
        });

        if (existed) {
            throw new AppError(409, "Email đã được sử dụng");
        }
    }

    return await prisma.$transaction(async (tx) => {
        // Cập nhật bảng User
        await tx.user.update({
            where: { id: doctor.userId! },
            data: {
                ...(data.fullName && { fullName: data.fullName.trim() }),
                ...(data.email && { email: data.email.trim() }),
                ...(data.phone && { phone: data.phone.trim() }),
                ...(data.avatar && { avatar: data.avatar }),
            },
        });

        // Cập nhật bảng Doctor
        return tx.doctor.update({
            where: { id: targetId },
            data: {
                ...(data.status && { status: data.status }),
                ...(data.departmentId !== undefined && {
                    departmentId: data.departmentId,
                }),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        phone: true,
                        avatar: true,
                        role: true,
                    },
                },
                department: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    });
}

export async function createDoctor(data: {
    userId: number;
    departmentId?: number;
}) {
    const user = await prisma.user.findUnique({
        where: {
            id: data.userId,
        },
    });
    if (!user) {
        throw new AppError(404, "Người dùng không tồn tại");
    }

    if (user.role !== Role.doctor) {
        throw new AppError(400, "User không có vai trò DOCTOR");
    }
    const existed = await prisma.doctor.findUnique({
        where: {
            userId: data.userId,
        },
    });
    if (existed) {
        throw new AppError(409, "Bác sĩ đã tồn tại");
    }

    return prisma.doctor.create({
        data: {
            userId: data.userId,
            departmentId: data.departmentId,
        },
        include: {
            user: {
                select: USER_SELECT,
            },
            department: true,
        },
    });
}

export async function remove(targetId: number, requestId: number) {
    if (targetId === requestId) {
        throw new AppError(400, "Bạn không thể tự xóa tài khoản của mình");
    }

    const user = await prisma.user.findUnique({
        where: { id: targetId },
    });
    if (!user) {
        throw new AppError(404, "Người dùng không tồn tại");
    }

    await prisma.user.delete({
        where: { id: targetId },
    });

    return {
        message: "Xóa người dùng thành công",
    };
}
