import type { Department } from "../../types/specialty";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
    Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Avatar,
    Chip, Button, Box, Divider, Paper, Alert, CircularProgress, Skeleton
} from "@mui/material";
import { useForm, Controller, set } from "react-hook-form";
import type { TimeSlot, WorkShift } from "../../types/appointment";
import type DoctorInfo from "../doctor/DoctorInfo";
import { getAllDoctors, getTimeSlotByDoctorId } from "../../services/doctorService";
import { getDepartments } from "../../services/departmentService";
import EmptyState from "../../components/common/EmptyState";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DoctorScheduleCalendar from "../doctor/DoctorScheduleCalendar";
import { createAppointment, type createTimeSlotDto } from "../../services/appointmentService";
import type { UserInfo } from "../../types/user";
import dayjs, { Dayjs } from 'dayjs';
import { useUser } from "../../context/UserProvider";

1
interface FormValues {
    departmentId: number | "";
    doctorId: number | "";
}

// Format giờ dạng HH:mm từ chuỗi ISO
const formatDate= (isoString: string) => {
    return dayjs(isoString).format('DD/MM/YYYY');
};

// Format giờ dạng HH:mm từ chuỗi ISO
const formatTime = (isoString: string) => {
    return dayjs(isoString).format('HH:mm');
};

const FindDoctorPage = ( ) => {
    const { user, setUser, logout } = useUser();
    const [doctors, setDoctors] = useState<DoctorInfo[] | null>(null);
    const [departments, setDepartments] = useState<Department[] | null>(null);
    const [selectedShift, setSelectedShift] = useState<TimeSlot | null>(null);
    const [doctorTimeSlots, setDoctorTimeSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState("");
    const [loadingTimeSlot, setLoadingTimeSlot] = useState(true);
    const [error, setError] = useState("");
    const [isBooking, setIsBooking] = useState(false);

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

                const doctorRes = await getAllDoctors();
                const departmentsRes = await getDepartments();

                setDepartments(departmentsRes);
                setDoctors(doctorRes.doctors);
            } catch (err: any) {
                if (err?.name === "CanceledError" || err?.code === "ER  R_CANCELED") {
                    return;
                }
                setError("Cannot load doctor and department right now. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
        setValue("doctorId", "");
    };

    const handleDoctorChange = (docId: number | string, onChange: (val: any) => void) => {
        onChange(docId);
        setSelectedShift(null);
        if (docId === "" || docId === null) {
            return;
        }
        const numericDocId = Number(docId);
        const targetDoc = doctors?.find((d) => d.id === numericDocId);

        if (targetDoc) {
            if (Number(selectedDeptId) !== targetDoc.departmentId) {
                setValue("departmentId", targetDoc.departmentId);
            }
        }
    };

    // Lọc danh sách bác sĩ thuộc Chuyên khoa đang chọn
    const filteredDoctors = useMemo(() => {
        if (!selectedDeptId) return [];
        if (doctors !== null) {
            return doctors.filter((doc) => doc.departmentId === Number(selectedDeptId));
        }
    }, [doctors, selectedDeptId]);

    useEffect(() => {
        // 1. Khởi tạo AbortController
        const controller = new AbortController();

        const fetchDataTimeSlot = async () => {
            try {
                // 🛑 Chỉ gọi API khi đã chọn bác sĩ hợp lệ
                if (!currentDoctor?.id) return;
                setLoadingTimeSlot(true);
                setError("");
                const res = await getTimeSlotByDoctorId(currentDoctor.id);
                setDoctorTimeSlots(res || []);
            } catch (err: any) {
                setError("Cannot load timeSlotByDoctorId right now. Please try again.");
            } finally {
                setLoadingTimeSlot(false);
            }
        };

        fetchDataTimeSlot();

        // 4. Cleanup: Hủy request khi component unmount
        return () => {
            controller.abort();
        };
    }, [currentDoctor]);

    // Helper kiểm tra ngày trong quá khứ
    const isPastDate = (dateString: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const targetDate = new Date(dateString);
        return targetDate < today;
    };

    const handleBooking = async () => {

        if (!selectedShift || !currentDoctor) return;
        // console.log("selectedShift", selectedShift);
        // console.log("currentDoctor", currentDoctor);
        // console.log("userInfo", userInfo);
        // console.log("userInfo.id", userInfo.id);
        try {
            console.log("user.id", user.id)
            console.log("currentDoctor.id", currentDoctor.id)
            if (user.id !== currentDoctor.id) {
                setIsBooking(true);
                console.log("selectedShift ", selectedShift);
                const data: createTimeSlotDto = {
                    userId: user.id,
                    doctorId: selectedShift.doctorId,
                    timeSlotId: selectedShift.id,
                    dayOfWeek: selectedShift.dayOfWeek,
                    timeType:selectedShift.timeType,
                    date: selectedShift.date,
                    startTime: selectedShift.startTime,
                    endTime: selectedShift.endTime,
                }
                // setSuccessMsg("data", data);
                const response = await createAppointment(data);
                setSuccessMsg("Đặt lịch thành công!");
                console.log(response);
                setSelectedShift(null); // Reset lại lựa chọn
            } else {
                setIsBooking(false);
                setError("Đặt lịch thất bại, Bác sĩ không thể đặt lịch chính mình");
            }
        } catch (err) {
            console.log("err ", err);
            setError("Đặt lịch thất bại.");

        } finally {
            setIsBooking(false);
        }

        alert(
            `Đã chọn đặt lịch thành công!\n
            - Bác sĩ: ${currentDoctor.name}\n
            - Ngày: ${formatDate(selectedShift.date)}\n
            - Buổi ${selectedShift.timeType === "morning" ? "Sáng" : "Chiều" 
            }: ${formatTime(selectedShift.startTime)}`
        );
    };
    // --- RENDER SKLETON LOADING ---
    if (loading || !filteredDoctors) {
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
                                        <InputLabel id="dept-select-label">1. Chọn Chuyên Khoa (*)</InputLabel>
                                        <Select
                                            {...field}
                                            labelId="dept-select-label"
                                            label="1. Chọn Chuyên Khoa (*)"
                                            onChange={(e) => handleDepartmentChange(e.target.value, field.onChange)}
                                        >
                                            <MenuItem value="">
                                                <em>-- Chọn chuyên khoa --</em>
                                            </MenuItem>
                                            {departments.map((dept) => (
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
                                    <FormControl
                                        fullWidth
                                        size="small"
                                        disabled={!selectedDeptId} // 👈 KHÓA LẠI NẾU CHƯA CHỌN KHOA
                                    >
                                        <InputLabel id="doc-select-label">
                                            {selectedDeptId ? "2. Chọn Bác Sĩ" : "2. Vui lòng chọn khoa trước"}
                                        </InputLabel>
                                        <Select
                                            {...field}
                                            labelId="doc-select-label"
                                            label={selectedDeptId ? "2. Chọn Bác Sĩ" : "2. Vui lòng chọn khoa trước"}
                                            onChange={(e) => handleDoctorChange(e.target.value, field.onChange)}
                                        >
                                            <MenuItem value="">
                                                <em>-- Chọn bác sĩ --</em>
                                            </MenuItem>
                                            {filteredDoctors.map((doc) => (
                                                <MenuItem key={doc.id} value={doc.id}>
                                                    {doc.title} {doc.user?.name || `Bác sĩ #${doc.id}`}
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
                                <Box>
                                    <DoctorScheduleCalendar
                                        timeSlots={doctorTimeSlots}
                                        onSelectSlot={(slot) => {
                                            console.log("Suất khám đã chọn:", slot);
                                            setSelectedShift(slot);
                                        }}
                                    />
                                </Box>

                                {/* Nút đặt lịch */}
                                <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        disabled={!selectedShift}
                                        onClick={handleBooking}
                                        sx={{ borderRadius: 2, px: 4 }}
                                    >
                                        {selectedShift
                                            ? `Đặt Lịch Khám (${formatDate(selectedShift.date)} ${dayjs(selectedShift.startTime).format('HH:mm')})`
                                            : "Vui lòng chọn suất khám"}
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