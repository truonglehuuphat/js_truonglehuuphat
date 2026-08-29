import prisma from '../db/prisma';
import { Prisma, Role } from "../generated/prisma/client";
import { AppError } from "../types/api";
import { buildSkip } from '../utils/pagination';

interface CreateDepartmentDto {
    name: string;
}

interface UpdateDepartmentDto {
    name?: string;
}


export async function findAll(query: {
    role?: string;
    search?: string;
    page: number,
    limit: number
}
) {
    const { role, search, page, limit } = query;
    const where: Prisma.DepartmentWhereInput = {
        ...(search && {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
            ],
        }),
    };
    const [data, total] = await prisma.$transaction([
        prisma.department.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: buildSkip(page, limit),
        }),
        prisma.department.count({ where }),
    ]);

    return { data, total };
}

export async function findById(id?: number, name?: string) {
    if (id) {
        return await prisma.department.findUnique({
            where: { id },
            include: {
                doctors: true
            }
        });
    }
    if (name) {
        return await prisma.department.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive",
                }
            },
            include: {
                doctors: true
            }
        });
    }
}

export async function create(data: CreateDepartmentDto) {
    const existed = await prisma.department.findFirst({
        where: {
            name: {
                equals: data.name,
                mode: "insensitive",
            },
        },
    });

    if (existed) {
        throw new Error("Specialty already exists");
    }

    return await prisma.department.create({
        data: {
            name: data.name.trim(),
        },
    });
}



export async function updateById(
    id: number,
    data: UpdateDepartmentDto
) {
    const department = await prisma.department.findFirst({
        where: { id },
    });
    if (!department) {
        throw new Error("Phòng ban không tìm thấy");
    }
    return prisma.department.update({
        where: { id },
        data: {
            ...(data.name && { name: data.name.trim() })
        }
    });
}



export async function remove(id: number) {
    
    const department = await prisma.department.findUnique({ where: { id } });
    if (!department) throw new AppError(404, 'Không tìm thấy phòng ban');

    // Không cho xóa nếu còn bác sĩ hoặc hồ sơ y tế liên quan
    //   if (specialty.doctors.length > 0) {
    //     throw new Error("Cannot delete specialty because it has doctors");
    //   }

    //   if (specialty.medicals.length > 0) {
    //     throw new Error("Cannot delete specialty because it has medical records");
    //   }
    return prisma.department.delete({
        where: { id }
    });
}