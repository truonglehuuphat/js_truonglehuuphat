import { skip } from "node:test";
import { Prisma, Student } from "../generated/prisma";
import { buildSkip } from "../utils/pagination";
import prisma from "../db/prisma";
import { AppError } from "../types/api";

export interface Class {
    id: number;
    name: string;
    subject: string;
    teacherName: string;
    maxStudents: number;
    students?: Student[];
    schedule: string;
    creatAt: string
}

export async function findAll(filters: {
    subject?: string;
    hasSlot?: boolean;
    sort?: string;
    order?: string;
    page: number;
    limit: number;
}) {
    const { subject, hasSlot, sort = 'name', order = 'asc', limit = 10, page = 1 } = filters;


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
    return { filter, total };
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

export async function create(data: {
    subject?: string;
    teacherName: string;
    maxStudents: number;
    schedule: string;
    name: string;
}) {
    const {subject, teacherName, maxStudents, schedule, name } = data;

    const classData = await prisma.class.findMany({
        where: {
            ...(subject && { subject: { contains: subject, mode: 'insensitive' } }),
        },
    })
    if(classData ){
        throw new AppError(409, `Lớp học ${data.subject} đã tồn tại` );
    }
    return await prisma.class.create({
        data: {
            subject: data.subject as string,
            teacherName: data.teacherName,
            name: data.name,
            maxStudents: data.maxStudents,
            schedule: data.schedule
        }
    })
}