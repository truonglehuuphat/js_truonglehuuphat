import {
    Alert, Box, Button, ButtonGroup, Container, FormControl,
    Grid, InputLabel, MenuItem, Paper, Select, Snackbar,
    Stack, TextField, ToggleButton, ToggleButtonGroup, Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { checkoutSchema, type CheckoutFormData } from "../schemas/checkoutSchema";
import React from "react";
import type { Department } from "../types/specialty";

export const departments: Department[] = [
    { code: "1", name: "CK Tai Mắt Mũi Họng" },
    { code: "2", name: "CK Tim mạch" },
    { code: "3", name: "CK Hô Hấp" },
    { code: "4", name: "CK Nội tiết" }, // Đã chỉnh lại chính tả từ "Nộp tiết" thành "Nội tiết"
    { code: "5", name: "CK Nhi" },
    { code: "6", name: "CK Sản Phụ Khoa" },
];

const RegisterPage = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }, // ✅ RESTORE ERRORS
        reset,
        resetField,
    } = useForm<CheckoutFormData>({
        resolver: yupResolver(checkoutSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            provinceCode: "",
            wardCode: "",
            deliveryDate: "",
            note: "",
        },
    });
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [department, setDepartment] = useState<Department[]>(departments);
    const [submitError, setSubmitError] = useState("");
    const [alignment, setAlignment] = React.useState('web');
    const [alignment2, setAlignment2] = React.useState('web');
    const onSubmit = async (formData: CheckoutFormData) => {
    }

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };
    const handleChange2 = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment2(newAlignment);
    };
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>
            {/* LEFT FORM */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper sx={{ p: 3, borderRadius: 3 }} variant="outlined">
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                            Đăng ký khám và tạo hồ sơ
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                {/* NAME */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Họ và Tên" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
                                </Grid>
                                {/* DATE */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Controller
                                        name="birthday"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Ngày Sinh"
                                                value={field.value ? dayjs(field.value) : null}
                                                onChange={(date) => field.onChange(date ? date.format("YYYY-MM-DD") : "")}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        error: !!errors.deliveryDate,
                                                        helperText: errors.deliveryDate?.message,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                {/* EMAIL */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
                                </Grid>

                                {/* PHONE */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Số điện thoại" {...register("phone")} error={!!errors.phone} helperText={errors.phone?.message} />
                                </Grid>
                                {/* ADDRESS */}
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ"
                                        multiline
                                        rows={3}
                                        {...register("address")}
                                        error={!!errors.address}
                                        helperText={errors.address?.message}
                                    />
                                </Grid>
                                {/* Chọn dịch vụ khám */}
                                <Grid size={{ xs: 12}} >
                                    {/* </Box> */}
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={alignment}
                                        exclusive
                                        onChange={handleChange}
                                        aria-label="Platform"
                                        fullWidth
                                        sx={{
                                            '& .MuiToggleButton-root': {
                                                color: '#555', // Màu mặc định của icon/chữ
                                                '&.Mui-selected': {
                                                    backgroundColor: '#1976d2', // Màu nền khi ĐƯỢC CHỌN (đậm hơn)
                                                    color: '#fff', // Màu icon/chữ khi được chọn
                                                    '&:hover': {
                                                        backgroundColor: '#115293', // Màu nền khi hover vào nút đang chọn
                                                    },
                                                },
                                                '&:hover': {
                                                    backgroundColor: '#e0e0e0', // Màu nền khi hover vào nút chưa chọn
                                                },
                                            },
                                        }}
                                    >
                                        <ToggleButton value="reverInSchedule">Khám trong giờ</ToggleButton>
                                        <ToggleButton value="reverOutSchedule">Khám ngoài giờ</ToggleButton>
                                        <ToggleButton value="reverOnline">Khám online</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                                {/* Chọn khung giờ khám */}
                                <Grid size={{ xs: 12}} >
                                    {/* </Box> */}
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={alignment2}
                                        exclusive
                                        onChange={handleChange2}
                                        aria-label="Platform"
                                        fullWidth
                                        sx={{
                                            '& .MuiToggleButton-root': {
                                                color: '#555', // Màu mặc định của icon/chữ
                                                '&.Mui-selected': {
                                                    backgroundColor: '#1976d2', // Màu nền khi ĐƯỢC CHỌN (đậm hơn)
                                                    color: '#fff', // Màu icon/chữ khi được chọn
                                                    '&:hover': {
                                                        backgroundColor: '#115293', // Màu nền khi hover vào nút đang chọn
                                                    },
                                                },
                                                '&:hover': {
                                                    backgroundColor: '#e0e0e0', // Màu nền khi hover vào nút chưa chọn
                                                },
                                            },
                                        }}
                                    >
                                        <ToggleButton value="reverMorning">Buổi sáng</ToggleButton>
                                        <ToggleButton value="reverNoon">Buổi trưa</ToggleButton>
                                        <ToggleButton value="reverAfternoon">Buổi chiều</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>

                                {/* Chọn chuyên khoa */}
                                <Grid size={{ xs: 12}}>
                                    <Controller
                                        control={control}
                                        name="wardCode"
                                        render={({ field }) => (
                                            <FormControl fullWidth >
                                                <InputLabel>Chọn chuyên khoa</InputLabel>
                                                <Select label="Chọn chuyên khoa" {...field}>
                                                    {department.map((w) => (
                                                        <MenuItem key={w.code} value={String(w.code)}>
                                                            {w.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>


                                                <Typography variant="caption" color="error">
                                                    {errors.provinceCode?.message}
                                                </Typography>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>

                                {/* DATE */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Controller
                                        name="dayAppointment"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Chọn ngày khám"
                                                value={field.value ? dayjs(field.value) : null}
                                                onChange={(date) => field.onChange(date ? date.format("YYYY-MM-DD") : "")}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        error: !!errors.deliveryDate,
                                                        helperText: errors.deliveryDate?.message,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                {/* Ghi chú */}
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Nhập vấn đề sức khỏe cần khám"
                                        multiline
                                        rows={3}
                                        {...register("note")}
                                        error={!!errors.note}
                                        helperText={errors.note?.message}
                                    />
                                </Grid>

                            </Grid>

                            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} disabled={submitting}>
                                {submitting ? "Tiếp theo..." : "Tiếp theo"}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default RegisterPage;