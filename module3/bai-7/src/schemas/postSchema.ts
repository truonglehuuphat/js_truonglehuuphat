import * as yup from "yup";

export const createPostSchema =yup.object({
    title: yup.string().min(1).max(200).required("Tiêu đề không được rỗng"),
    content: yup.string().min(10, "Nội dung tối thiếu 10 ký tự").required(),
    category: yup.string().oneOf(['tech', 'life', 'news'],"Category không hợp lệ").required(),
    tags: yup.array(yup.string()).optional()
});

export const updatePostSchema = createPostSchema.partial();

export type CreatePostInput = yup.InferType<typeof createPostSchema>;
export type UpdatePostInput = yup.InferType<typeof updatePostSchema>;