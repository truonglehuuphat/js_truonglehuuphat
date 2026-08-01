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
    sort: yup.string().nullable().oneOf(['name', 'subject','createAt']).default('name'),
    page: yup.number().positive('page phải lớn hơn 0').default(1),
    limit: yup.number().positive('limit phải lớn hớn 0').max(100).default(10)
});

//Student schemas

