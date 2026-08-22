import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    name: yup.string().required('tên là bất buộc').min(2, 'Tên tối thiểu 2 ký tự').max(100),
    email: yup.string().email('Email không hợp lệ').required('Email là bất buộc').max(100),
    password: yup.string().required('Mật khẩu là bắt buộc')
        .min(8,'Mật khẩu ít nhất 8 ký tự')
        .matches(/[A-Z]/, 'Mật khẩu phải có chữ Hoa')
        .matches(/[0-9]/, 'Mật khẩu phải có số'),
    confirmPassword: yup.string().required('Xác nhậ Mật khẩu là bắt buộc')
    .oneOf([yup.ref('password')],'Mật khẩu xác nhận không khớp'),
});

export const loginSchema = yup.object().shape({
    email: yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
    password: yup.string().required('Mật khẩu là bắt buộc'),
});

export const refreshSchema = yup.object().shape({
    refreshToken: yup.string().required('Thiếu refresh token'),
});

export type RegisterInput = yup.InferType<typeof registerSchema>;
export type LoginInput = yup.InferType<typeof loginSchema>;