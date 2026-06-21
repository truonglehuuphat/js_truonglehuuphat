import * as yup from "yup";

export const checkoutSchema = yup.object({
    username: yup.string().trim().min(2,"Họ tên phải có ít nhất 2 ký tự").required("Họ tên không được để trống"),
    email: yup.string().trim().email("Email chưa đúng định dạng").required("Email không được để trống"),
    // phone: yup.string().trim().matches('/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/', "Số điện thoại không hợp lệ").required("Số điện thoại không được để trống"),
    phone: yup.string().trim().min(9, "Số điện thoại không hợp lệ").required("Số điện thoại không được để trống"),
    provinceCity: yup.string().trim().min(8,"Tỉnh/Thành Phố phải ít nhất 8 ký tự").required("Tỉnh/Thành Phố không được để trống"),
    address: yup.string().trim().min(8,"Địa chỉ phải ít nhất 8 ký tự").required("Địa chỉ không được để trống"),
    note: yup.string().trim().max(300,"Ghi chú tối đa 300 ký tự")
});

// <form onSubmit={handleSubmit(onSubmit)} noValidate>
//     <div style={{marginBottom: 16}}>
//         <label style={{display: "block", marginBottom: 4, fontWeight: 600 }}>
//         Họ và tên <span style={{}}></span>
//         </label>
//         <input {...register("name")} style={inputStyle(!!errors.name)}/> 
//         {errors.name && <p style={{errorStyle}}>{errors.name.message}</p>}
//     </div>
// </form>