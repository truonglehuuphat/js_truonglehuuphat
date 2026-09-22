import { useEffect, useMemo, useState } from "react";
import MyAppointmetRowPage from "./MyAppointmetRowPage";
import type { MeAppointment } from "../../types/appointment";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { getAllAppointmentById } from "../../services/appointmentService";
import type { UserInfo } from "../../types/user";
import { useUser } from "../../context/UserProvider";
import { doctorContext } from "../../context/DoctorProvider";
import { departContext } from "../../context/DepartmentProvider";
import { useAppointment } from "../../context/Appointment";

const MyAppointmentsPage = () => {
    const [appoint, SetAppoint] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const { user, setUser, logout } = useUser();
    const { doctor, setDoctor } = doctorContext();
    const { depart, setDepart } = departContext();
    const { refreshTrigger } = useAppointment();
    console.log("refreshTrigger", refreshTrigger);
    useEffect(() => {
        const controller = new AbortController();
        console.log("MyAppointmentsPage");
        // if (!user?.accessToken) {
        //     return;
        // }
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");
                const result = await getAllAppointmentById(controller.signal);
                // console.log("2. Kết quả API:", doctorRes.doctors); // KIỂM TRA 2
                SetAppoint(result.data?.data);
            } catch (err: any) {
                if (err.name === "CanceledError" || err.name === "AbortError" || err.code === "ERR_CANCELED") {
                    console.log("Request đã bị hủy do component unmount hoặc re-render");
                    return;
                }
                console.log("3. Lỗi gặp phải:", err); // KIỂM TRA 3
                setError("Cannot load your Appointment right now. Please try again.");
            }
            finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };
        fetchData();
        return () => {
            controller.abort();
        };
    }, [user?.accessToken, refreshTrigger]);
    const appointmentData: MeAppointment = {
        doctorName: " ",
        department: " ",
        description: " ",
        date: new Date(), // Khởi tạo kiểu Date
        status: "",
        isBlocked: false,
        comment: " "
    };

    const mapAppointmentsToMeAppointments = (
        appointments: any[],
        doctors: any[],
        departments: any[]
    ): MeAppointment[] => {
        if (!appointments || appointments.length === 0) return [];

        return appointments.map((appointment) => {
            // 1. Tìm thông tin bác sĩ theo doctorId
            const foundDoctor = doctors.find(
                (doc) => doc.id === appointment.doctorId
            );

            // 2. Tìm thông tin khoa phòng theo departmentId từ bác sĩ hoặc từ appointment
            const foundDepartment = departments.find(
                (dept) => dept.id === (foundDoctor?.departmentId || appointment.departmentId)
            );

            // 3. Trả về object đúng chuẩn interface MeAppointment
            return {
                doctorName: foundDoctor ? foundDoctor.name : "Chưa xác định",
                department: foundDepartment ? foundDepartment.name : "Chưa xác định",
                description: appointment.description || "",
                date: new Date(appointment.date), // Chuyển đổi chuỗi ISO/timestamp về kiểu Date
                status: appointment.status || "PENDING",
                isBlocked: Boolean(appointment.isBlocked),
                comment: appointment.comment || "",
            };
        });
    };
    // Tự động map dữ liệu mỗi khi dữ liệu đầu vào thay đổi
    const mappedAppointments: MeAppointment[] = useMemo(() => {
        return mapAppointmentsToMeAppointments(appoint, doctor, depart);
    }, [appoint, doctor, depart]);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5">Lịch khám của tôi</Typography>
            <TextField
                label="Search ticker..."
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Bác sĩ</TableCell>
                        <TableCell>Chuyên khoa</TableCell>
                        <TableCell>Nội dung khám</TableCell>
                        <TableCell>Ngày giờ khám</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Sửa</TableCell>
                        <TableCell>xóa</TableCell>
                        <TableCell>viết bình luận</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        mappedAppointments.length > 0 ? (
                            mappedAppointments.map((m: any, index: number) => (
                                <MyAppointmetRowPage key={m.id || index} meAppointment={m} />
                            ))
                        ) : (
                                <></>
                        )
                    }
                </TableBody>
            </Table>

        </Box>


    )
}

export default MyAppointmentsPage;