import * as yup from 'yup'

//Class Schemas

export const classCreateSchema = yup.object().shape({
    name: yup.string().required("Tên lớp là bắt buộc").min(2).max(100),
    subject: yup.string().required("Môn học là bắt buộc").min(2).max(50),
    teacherName: yup.string().required("Tên giáo viên là bất buộc").min(2).max(100),
    maxStudents: yup.number().required("Số học sinh tối da là bất buộc").min(10).min(50).typeError('maxStudents phải là số'),
    schedule: yup.string().nullable().max(225)
});

export const classQuerySchema = yup.object().shape({
    subject: yup.string().nullable().max(50),
    hasSlot: yup.boolean().nullable(),
    sort: yup.string().nullable().oneOf(['name', 'subject', 'createAt']).default('name'),
    order: yup.string().nullable().oneOf(['asc', 'desc']).default('asc'),
    page: yup.number().positive('page phải lớn hơn 0').default(1),
    limit: yup.number().positive('limit phải lớn hớn 0').max(100).default(10)
});

//Student schemas

export const studentCreateSchema = yup.object().shape({
    fullname: yup.string().required("Tên là bất buộc").min(2).max(100),
    email: yup.string().required("Email là bất buộc").email().max(150),
    phone: yup.string().nullable().max(15),
    classId: yup.number().nullable().positive("Không được âm"),
    gpa: yup.string().nullable().min(0).max(4).typeError("gpa phải là số"),
    status: yup.string().nullable().oneOf(['active', 'inactive', 'graduated']).default('active')
});

export const studentUpdateSchema = yup.object().shape({
    fullname: yup.string().min(2).max(100),
    email: yup.string().email().max(150),
    phone: yup.string().nullable().max(15),
    classId: yup.number().nullable().positive("Không được âm"),
    gpa: yup.string().nullable().min(0).max(4),
    status: yup.string().oneOf(['active', 'inactive', 'graduated'])
});

export const studentQuerySchema = yup.object().shape({
    classId: yup.number().nullable().positive('Không được âm'),
    status: yup.string().nullable().oneOf(['active', 'inactive', 'graduated']),
    search: yup.string().nullable().max(100),
    sort: yup.string().nullable().oneOf(['fullName', 'email', 'gpa', 'enrolledAt']).default('enrolledAt'),
    order: yup.string().nullable().oneOf(['asc', 'desc']).default('desc'),
    page: yup.number().positive("page phải lớn hơn 0").default(1),
    limit: yup.number().positive("limit phải lớn hơn 0").default(10).max(100)
});

// grade schemas

export const gradeCreateSchema = yup.object().shape({
    subject: yup.string().required().min(2).max(50),
    midterm: yup.number().required("Điểm giữa học kỳ là bất buộc").min(0).max(10),
    final: yup.number().required("Điểm cuối học kỳ là bất buộc").min(0).max(10)
});

export const gradeUpdateSchema = yup.object().shape({
    midterm: yup.string().min(0).max(10),
    final: yup.number().min(0).max(10)
});
