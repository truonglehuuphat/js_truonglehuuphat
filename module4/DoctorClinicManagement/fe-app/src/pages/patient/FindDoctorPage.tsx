import type { Department } from "../../types/specialty";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
    Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Avatar,
    Chip, Button, Box, Divider, Paper, Alert, CircularProgress, Skeleton
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type { WorkShift } from "../../types/appointment";
import type DoctorInfo from "../doctor/DoctorInfo";
import { getAllDoctors } from "../../services/doctorService";
import { getDepartments } from "../../services/departmentService";
import EmptyState from "../../components/common/EmptyState";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface FormValues {
    departmentId: number | "";
    doctorId: number | "";
}


const FindDoctorPage = () => {
    const [doctors, setDoctors] = useState<DoctorInfo[] | null>(null);
    const [departments, setDepartments] = useState<Department[] | null>(null);
    const [selectedShift, setSelectedShift] = useState<WorkShift | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // --- REACT HOOK FORM ---
    const { control, watch, setValue } = useForm<FormValues>({
        defaultValues: {
            departmentId: "",
            doctorId: ""
        }
    });

    const selectedDeptId = watch("departmentId");
    const selectedDocId = watch("doctorId");


    useEffect(() => {
        // 1. Khởi tạo AbortController
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                // // 2. Gọi đồng thời các API bằng Promise.all
                // const [departmentsRes, doctorsRes] = await Promise.all([
                //     axios.get<Department[]>(`${API_BASE_URL}/departments`, {
                //         signal: controller.signal
                //     }),
                //     axios.get<DoctorInfo[]>(`${API_BASE_URL}/doctors`, {
                //         signal: controller.signal
                //     })
                // ]);
                const doctorRes = await getAllDoctors();
                const departmentsRes = await getDepartments();
                console.log(doctorRes)
                console.log(departmentsRes)
                setDepartments(departmentsRes);

                setDoctors(doctorRes.doctors);
            } catch (err: any) {
                if (err?.name === "CanceledError" || err?.code === "ER  R_CANCELED") {
                    return;
                }
                setError("Cannot load products right now. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // 4. Cleanup: Hủy request khi component unmount
        return () => {
            controller.abort();
        };
    }, []);

    // --- MEMOIZED DERIVED STATES ---


    // Bác sĩ đang được chọn chi tiết
    const currentDoctor = useMemo(() => {
        if (doctors !== null) {
            return doctors.find((doc) => doc.id === selectedDocId) || null;
        }
    }, [doctors, selectedDocId]);

    // --- HANDLERS ---
    const handleDepartmentChange = (deptId: number | string, onChange: (val: any) => void) => {
        onChange(deptId);
        // 2. Chuyển sang kiểu number để so sánh với Prisma Schema (tránh lỗi "1" !== 1)
        // const numericDeptId = deptId !== "" ? Number(deptId) : null;
        // 3. Nếu chọn khoa khác mà bác sĩ đang chọn không thuộc khoa này -> reset chọn bác sĩ
        // if (currentDoctor && currentDoctor.departmentId !== numericDeptId) {
        //     setValue("doctorId", "");
        //     setSelectedShift(null);
        // }
        // Luôn reset Bác sĩ & Ca khám khi đổi Chuyên khoa
        // Giúp người dùng bắt buộc chọn lại Bác sĩ phù hợp với Khoa mới
        setValue("doctorId", "");
        setSelectedShift(null);
    };

    const handleDoctorChange = (docId: number | string, onChange: (val: any) => void) => {
        onChange(docId);
        setSelectedShift(null);
        // // 1. Tự động đồng bộ Chuyên khoa lên dropdown nếu chưa chọn
        // // 2. Nếu bỏ chọn Bác sĩ (chọn "-- Chọn bác sĩ --")
        // if (docId === "" || docId === null) {
        //     return;
        // }
        // // 3. Tự động đồng bộ Chuyên khoa lên Select Department tương ứng với Bác sĩ được chọn
        // const numericDocId = Number(docId);
        // const targetDoc = doctors?.find((d) => d.id === numericDocId);

        // if (targetDoc) {
        //     // Nếu Chuyên khoa hiện tại trên Form khác với Chuyên khoa của Bác sĩ này -> Tự động update
        //     if (Number(selectedDeptId) !== targetDoc.departmentId) {
        //         setValue("departmentId", targetDoc.departmentId);
        //     }
        // }
    };

    // Lọc danh sách bác sĩ dựa trên chuyên khoa đang chọn
    // const filteredDoctors = useMemo(() => {
    //     if (!selectedDeptId) return doctors;
    //     if (doctors !== null) {
    //         return doctors.filter((doc) => doc.departmentId === selectedDeptId);
    //     }

    // }, [doctors, selectedDeptId]);
    // Lọc danh sách bác sĩ thuộc Chuyên khoa đang chọn
    const filteredDoctors = useMemo(() => {
        if (!selectedDeptId ) return [];
        if (doctors !== null) {
            return doctors.filter((doc) => doc.departmentId === Number(selectedDeptId));
        }
    }, [doctors, selectedDeptId]);


    // Helper kiểm tra ngày trong quá khứ
    const isPastDate = (dateString: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const targetDate = new Date(dateString);
        return targetDate < today;
    };

    const handleBooking = () => {
        if (!selectedShift || !currentDoctor) return;
        alert(
            `Đã chọn đặt lịch thành công!\n- Bác sĩ: ${currentDoctor.name}\n- Ngày: ${selectedShift.date}\n- Ca: ${selectedShift.session === "MORNING" ? "Sáng" : "Chiều"
            } (${selectedShift.timeRange})`
        );
    };
    // --- RENDER SKLETON LOADING ---
    if (loading) {
        return (
            <EmptyState />
        );
    }


    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "700", color: "primary", textAlign: "center", mb: "3" }} >
                Tìm Kiếm & Đặt Lịch Khám Bác Sĩ
            </Typography>

            {/* Hiển thị lỗi tổng quan nếu gọi API thất bại */}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* BÊN TRÁI: BỘ LỌC TÌM KIẾM */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: "600", color: "primary", textAlign: "center", mb: "2", display: "flex", alignItems: "center", gap: "1" }}   >
                            <MedicalServicesIcon color="primary" /> Bộ Lọc Tìm Kiếm
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                            {/* Dropdown Chuyên khoa */}
                            <Controller
                                control={control}
                                name="departmentId"
                                render={({ field }) => (
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="dept-select-label">Chọn Chuyên Khoa</InputLabel>
                                        <Select
                                            {...field}
                                            labelId="dept-select-label"
                                            label="Chọn Chuyên Khoa"
                                            onChange={(e) => handleDepartmentChange(e.targe?.value, field.onChange)}
                                        >
                                            <MenuItem value="">
                                                <em>-- Chọn chuyên khoa --</em>
                                            </MenuItem>
                                            {departments?.map((dept) => (
                                                <MenuItem key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />

                            {/* Dropdown Bác sĩ */}
                            <Controller
                                control={control}
                                name="doctorId"
                                render={({ field }) => (
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="doc-select-label">Chọn Bác Sĩ</InputLabel>
                                        <Select
                                            {...field}
                                            labelId="doc-select-label"
                                            label="Chọn Bác Sĩ"
                                            onChange={(e) => handleDoctorChange(e.target.value, field.onChange)}
                                        >
                                            <MenuItem value="">
                                                <em>-- Chọn bác sĩ --</em>
                                            </MenuItem>
                                            {filteredDoctors?.map((doc) => (
                                                <MenuItem key={doc.id} value={doc.id}>
                                                    {doc.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* BÊN PHẢI: CHI TIẾT BÁC SĨ & LỊCH KHÁM */}
                <Grid sx={{ xs: 12, md: 8 }} >
                    {currentDoctor ? (
                        <Card elevation={3} sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                {/* Thông tin bác sĩ */}
                                <Box sx={{ display: "flex", gap: '2', alignItems: "center", mb: "2" }}>
                                    <Avatar
                                        src={currentDoctor.thumbnail}
                                        alt={currentDoctor.name}
                                        sx={{ width: 80, height: 80, bgcolor: "primary.main", fontSize: 28 }}
                                    >
                                        {currentDoctor.name.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                            {currentDoctor.name}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                                            {currentDoctor.title}
                                        </Typography>
                                        <Chip
                                            label={departments?.find((d) => d.id === currentDoctor.departmentId)?.name || "Chuyên khoa"}
                                            color="primary"
                                            size="small"
                                            variant="outlined"
                                            sx={{ mt: 1 }}
                                        />
                                    </Box>
                                </Box>

                                <Typography variant="body2" color="text.secondary" >
                                    {currentDoctor.description}
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                {/* Danh sách ca làm việc */}
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                                    <CalendarMonthIcon color="action" /> Lịch Khám Khả Dụng
                                </Typography>

                                {/* {!currentDoctor.schedules || currentDoctor.schedules.length === 0 ? (
                                    <Alert severity="info">Hiện tại chưa có lịch khám được mở cho Bác sĩ này.</Alert>
                                ) : (
                                    <Grid container spacing={1.5}>
                                        {currentDoctor.schedules.map((shift) => {
                                            const disabled = isPastDate(shift.date) || shift.isBooked;
                                            const isSelected = selectedShift?.id === shift.id;

                                            return (
                                                <Grid item xs={12} sm={6} key={shift.id}>
                                                    <Paper
                                                        variant="outlined"
                                                        onClick={() => !disabled && setSelectedShift(shift)}
                                                        sx={{
                                                            p: 1.5,
                                                            borderRadius: 2,
                                                            cursor: disabled ? "not-allowed" : "pointer",
                                                            opacity: disabled ? 0.5 : 1,
                                                            borderColor: isSelected ? "primary.main" : "divider",
                                                            bgcolor: isSelected ? "primary.50" : "background.paper",
                                                            borderWidth: isSelected ? 2 : 1,
                                                            transition: "all 0.2s",
                                                            "&:hover": {
                                                                borderColor: disabled ? "divider" : "primary.main"
                                                            }
                                                        }}
                                                    >
                                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                                            <Typography variant="subtitle2" fontWeight={700}>
                                                                Ngày: {shift.date} {isPastDate(shift.date) && "(Đã qua)"}
                                                            </Typography>
                                                            <Chip
                                                                label={shift.session === "MORNING" ? "Sáng" : "Chiều"}
                                                                size="small"
                                                                color={shift.session === "MORNING" ? "warning" : "info"}
                                                            />
                                                        </Box>
                                                        <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                                                            <AccessTimeIcon fontSize="small" color="action" />
                                                            <Typography variant="caption" color="text.secondary">
                                                                {shift.timeRange}
                                                            </Typography>
                                                        </Box>
                                                        {shift.isBooked && (
                                                            <Typography variant="caption" color="error.main" display="block" mt={0.5}>
                                                                • Đã hết chỗ
                                                            </Typography>
                                                        )}
                                                    </Paper>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                )} */}

                                {/* Nút đặt lịch */}
                                <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        disabled={!selectedShift}
                                        onClick={handleBooking}
                                        sx={{ borderRadius: 2, px: 4 }}
                                    >
                                        {selectedShift ? `Đặt Lịch Khám (${selectedShift.date})` : "Vui lòng chọn suất khám"}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ) : (
                        <Paper elevation={1} sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
                            <Typography variant="h6" color="text.secondary">
                                Vui lòng chọn Bác sĩ để xem thông tin chi tiết và lịch làm việc.
                            </Typography>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Container >
    );
}

export default FindDoctorPage;