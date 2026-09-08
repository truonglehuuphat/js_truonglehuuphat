import * as yup from "yup";

export const checkoutRegister = yup.object({
    name: yup.string().trim().min(2, "Name must be at least 2 characters").required("Name is required"),
    email: yup.string().trim().email("Invalid email").required("Email is required"),
    phone: yup
        .string()
        .trim()
        .matches(/^(0|\+84)\d{9,10}$/, "Invalid phone number")
        .required("Phone is required"),
    password1: yup.string().trim().min(8, "Address must be at least 8 characters").required("Address is required"),
    password2: yup.string().trim().min(8, "Address must be at least 8 characters").oneOf([yup.ref('password1')], "Mật khẩu nhập lại không trùng khớp").required("Address is required"),

});

export type CheckoutRegister = yup.InferType<typeof checkoutRegister>;
