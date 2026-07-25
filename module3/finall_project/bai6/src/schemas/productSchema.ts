import * as yup from 'yup'
const Categories = ['phone', 'laptop','tablet','audio', 'accessory'];

export const createProductSchema = yup.object({
    title: yup.string().min(1,"Tên không được rỗng").required(),
    price: yup.number().positive("Giá không được âm").required(),
    thumbnail: yup.string().url("thumbnail phải là url").required(),
    category: yup.string().oneOf(Categories, "Categories không hợp lệ").required(),
    stock: yup.number().integer().min(0,"Stock không âm").required(),
    brand: yup.string().optional(),
    description: yup.string().optional(),
});

export const updateProductSchema = createProductSchema.partial()