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

export async function findAll(query: {
    role?: string;
    search?: string;
    page: number,
    limit: number
}
) {
    const { role, search, page, limit } = query;
    const where: Prisma.UserWhereInput = {
        ...(role && { role: role as Role }),
        ...(search && {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } }
            ],
        }),
    };
    const [data, total] = await prisma.$transaction([
        prisma.user.findMany({
            where,
            select: USER_SELECT,
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: buildSkip(page, limit),
        }),
        prisma.user.count({ where }),
    ]);

    return { data, total };
}

export async function findById(id: number) {
    const user = await prisma.user.findUnique({
        where: { id },
        select: USER_SELECT,
    });
    if (!user) throw new AppError(500, 'Người dùng không tồn tại');
    return user;
}

export async function updateProfile(
    id: number,
    data: {
        name?: string;
        email: string;
    }
) {
    if (data.email) {
        const dup = await prisma.user.findFirst({ where: { email: data.email, NOT: { id } } });
        if (dup) throw new AppError(409, 'Email đã được dùng bởi tài khoản khác');
        return prisma.user.update({ where: { id }, data, select: USER_SELECT });
    }
}

export async function updateRole(targetId: number, newRole: string, requesterId: number) {
    if (targetId === requesterId) {
        throw new AppError(400, 'Không thể tự thay đổi role của mình');
    }
    const user = await prisma.user.findUnique({ where: { id: targetId } });
    if (!user) { throw new AppError(404, 'Không tìm thấy user'); }
    return prisma.user.update({
        where: { id: targetId },
        data: { role: newRole as Role },
        select: USER_SELECT
    });
}

export async function remove(targetId: number, requestId: number) {
    if (targetId === requestId) {
        throw new AppError(400, 'không thể tự xóa tài khoản của mình');
    }
    const user = await prisma.user.findUnique({ where: { id: targetId } });
    if (!user) throw new AppError(404, 'Không tìm thấy user');

    return prisma.user.delete({
        where: { id: targetId }
    });
}