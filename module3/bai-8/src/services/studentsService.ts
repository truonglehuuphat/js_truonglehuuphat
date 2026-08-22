import pool from "../db/pool";
import prisma from "../db/prisma"
import { Prisma } from "../generated/prisma/client";
import { AppError } from "../types/api";
import { buildSkip } from "../utils/pagination";

export interface Student {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    class_id: number | null;
    gpa: number;
    status: "active" | "inactive" | "graduated";
    enrolled_at: string;
    updated_at: string;
}

export async function findAll(filters: {
    classId: number;
    status?: string;
    search?: string;
    sort?: string;
    order?: string;
    page: number;
    limit: number;
}) {
    console.log("findAll student service");
    const { classId, status, search, sort = 'enrolledAt', order = 'desc', page = 1, limit = 10 } = filters;

    const where: Prisma.StudentWhereInput = {
        ...(classId && { classId }),
        ...(status && { status: status as any }),
        ...(search && {
            OR: [
                { fullname: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } }
            ]
        }),
    };

    // transaction: chay 2 query cùng lúc - lấy data và đếm tổng
    const [students, total] = await prisma.$transaction([
        prisma.student.findMany({
            where,
            include: {
                class: { select: { name: true } },
                grades: { select: { id: true } }
            },
            orderBy: { [sort]: "asc" },
            take: limit,
            skip: buildSkip(page, limit),
        }),
        prisma.student.count({ where }),
    ])
    return { data: students, total };
}

export async function findById(id: number) {
    const students = await prisma.student.findUnique({
        where: { id },
        include: {
            class: true,
            grades: { orderBy: { recordedAt: 'desc' }},
        },
    });
    if (!students) {
        throw new AppError(404, "Không tìm thấy học sinh");
    }
    return students;
};

export async function create(data: {
    fullName: string;
    email: string;
    phone?: string;
    classId?: number;
    gpa?: number;
    status?: string;
}) {
    return prisma.$transaction(async (tx) => {
        if (data.classId) {
            const classData = await tx.class.findUnique({
                where: { id: data.classId },
                include: { _count: { select: { students: true } } },
            });
            if (!classData) throw new AppError(404, "Lớp học đã tồn tại")
            if (classData._count.students >= classData.maxStudents) {
                throw new AppError(409, `Lớp ${classData.maxStudents} đã đủ học sinh`);
            }
        }
        return tx.student.create({
            
            data: {
                fullname: data.fullName,
                email: data.email,
                phone: data.phone,
                classId: Number(data.classId),
                gpa: data.gpa ? parseFloat(String(data.gpa)) : 0,
                status: (data.status as any) || 'active'

            }
        })
    })

}

export async function update(id: number,
    data: {
        fullName?: string;
        email?: string;
        phone?: string;
        classId?: number;
        gpa?: number;
        status?: string;
    }) {
    return prisma.$transaction(async (tx) => {
        if (data.classId !== undefined && data.classId !== null) {
            const classData = await tx.class.findUnique({
                where: { id: data.classId },
                include: { _count: { select: { students: true } } }
            })
            if (!classData) { throw new AppError(404, "Lớp không tồn tại") };

            const currentStudent = await tx.student.findUnique({
                where: { id: id }
            })
            if (currentStudent?.classId != data.classId) {
                if (classData._count.students >= classData.maxStudents) {
                    throw new AppError(409, `Lớp học ${classData.subject} đã đầy học sinh`)
                }
            }
        }

        return tx.student.update({
            where: { id },
            data: {
                fullname: data.fullName,
                email: data.email,
                phone: data.phone,
                classId: data.classId,
                gpa: data.gpa !== undefined ? parseFloat(String(data.gpa)) : undefined,
                status: data.status as any
            },
            include: { class: true }
        })

    })
}

export async function remove(id: number) {
    return prisma.$transaction(async (tx) => {
        const studentData = await tx.student.findUnique({ where: { id } });
        if (!studentData) throw new AppError(404, "Không tìm thấy học sinh");

        if (studentData.status == "active") {
            throw new AppError(409, "không thể xóa học sinh đang hoạt động");
        }
        await tx.grade.deleteMany({ where: { id: studentData.id } });
        return tx.student.delete({ where: { id } });
    });
}


