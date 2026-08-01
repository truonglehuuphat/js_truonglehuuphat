import * as yup from "yup"

export const paginationSchema = yup.object({
    page: yup.number().integer().min(1).default(1),
    limit: yup.number().integer().min(1).max(100).default(10),
})

export const classQuerySchema = paginationSchema.shape({
    name: yup.string().min(1, "Tên không được rỗng").required(),
    subject: yup.string().min(1, "môn học không được rỗng").required(),
    teacherName: yup.string().min(1, "Tên giao viên phải có").required(),
    maxStudents: yup.number(),
    schedule: yup.string().min(1, "Lịch không để rỗng").required()
})

export type ClassQuerySchema = yup.InferType<typeof classQuerySchema>