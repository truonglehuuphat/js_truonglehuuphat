import * as yup from "yup"

export const paginationSchema = yup.object({
   page: yup.number().integer().min(1).default(1),
   limit: yup.number().integer().min(1).max(100).default(10),
})

export const studentQuerySchema = paginationSchema.shape({
   fullName: yup.string().min(1,"Tên không được rỗng").required(),
   email: yup.string().email("Email chưa đúng định dạng").required("Email không được để trống"),
   phone: yup.string().matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ").required("Số điện thoại không được để trống"),
   classId: yup.number().required("Không được để trống"),
   gpa: yup.number(),
   status: yup.string(),
   search: yup.string().max(100).optional(),
   sort: yup.string().oneOf(["fullName", "gpa", "enrolledAt"]).default("fullName"),
   order: yup.string().oneOf(["asc", "desc"]).default("asc"),
})

export type StudentSchema = yup.InferType<typeof studentQuerySchema>