import { skip } from "node:test";
import { buildSkip } from "../utils/pagination";
import prisma from "../db/prisma";
import { AppError } from "../types/api";


export async function findAll(filters: {
    subject?: string;
    hasSlot?: boolean;
    sort?: string;
    order?: string;
    page: number;
    limit: number;
}) {
    const { subject, hasSlot, sort = 'name', order = 'asc', limit = 10, page = 1 } = filters;
    console.log(process.env.DATABASE_URL)
    const classData = await prisma.class.findMany({
        where: {
            ...(subject && { subject: { contains: subject, mode: 'insensitive' } }),
        },
        include: {
            _count: { select: { students: true } }
        },
        orderBy: { [sort]: order },
        take: limit,
        skip: buildSkip(page, limit)
    })
    const filter = hasSlot ? classData.filter((c: any) => c._count.students < c.maxStudents) : classData;
    const total = await prisma.class.count({
        where: {
            ...(subject && { subject: { constains: subject, mode: 'insensitive' } })
        }
    })
    return { data: filter, total: total };
}

export async function findById(id: number) {
    const classData = await prisma.class.findUnique({
        where: { id },
        include: {
            _count: { select: { students: true } },
            students: {
                where: { status: 'active' },
                orderBy: { gpa: 'desc' }
            }
        }
    })

    if (!classData) {
        throw new AppError(404, "Lớp học không tồn tại");
    }

    return classData;
}

export async function create(data: Prisma.ClassCreateInput) {
    return await prisma.class.create({
        data,
        include: { _count: { select: { students: true } } }
    });
}

export async function update(id: number, data: Prisma.ClassUpdateInput) {
    return prisma.class.update({
        where: { id: id },
        data,
        include: { _count: { select: { students: true } } }
    });
}

export async function remove(id: number) {
    return prisma.class.delete({ where: { id } });
}

export async function transferStudent(studentId: number, newClassId: number) {

    return prisma.$transaction(async (tx) => {
        // tim kiem hoc sinh ton tai khong
        const student = await tx.student.findUnique({ where: { id: studentId } });
        if (!student) throw new AppError(404, "Không tìm thấy học sinh");
        // tim kiem lop hoc ton tai khong
        const newClass = await tx.class.findUnique({
            where: { id: newClassId },
            include: { _count: { select: { students: true } } }
        });
        if (!newClass) throw new AppError(404, "Lớp học không tồn tại");
        // ti so hs lon hon slg hs toi da khong
        if (newClass._count.students >= newClass.maxStudents) {
            throw new AppError(409, "Số học sinh tối đa");
        }
        // cap nhat hoc sinh, lop hoc moi
        return tx.student.update({
            where: { id: studentId },
            data: { classId: newClassId }
        })
    })
}