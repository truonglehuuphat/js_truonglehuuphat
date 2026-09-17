import { useEffect, useState } from "react";
import MyAppointmetRowPage from "./MyAppointmetRowPage";
import type { MeAppointment } from "../../types/appointment";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { getAllAppointmentById } from "../../services/appointmentService";
import type { UserInfo } from "../../types/user";

const MyAppointmentsPage = ({ userInfo }: { userInfo: UserInfo }) => {
    const [appoint, SetAppoint] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        if (!userInfo?.accessToken) {
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");
                // console.log("2. Gọi API:"); // KIỂM TRA 2
                // console.log("userInfo.user.id", userInfo.id);
                const result = await getAllAppointmentById(controller.signal);
                // console.log("2. Kết quả API:", doctorRes.doctors); // KIỂM TRA 2
                console.log("result:", result);
                SetAppoint(result);
            } catch (err: any) {
                if (err.name === "CanceledError" || err.name === "AbortError" || err.code === "ERR_CANCELED") {
                    console.log("Request đã bị hủy do component unmount hoặc re-render");
                    return;
                }
                console.log("3. Lỗi gặp phải:", err); // KIỂM TRA 3
                setError("Cannot load your Appointment right now. Please try again.");
                // console.log("Cannot load doctors right now. Please try again."); // KIỂM TRA fail
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
    }, [userInfo]);

    console.log("appoint", appoint);
    const appointmentData: MeAppointment = {
        doctorName: "BS. Nguyễn Văn A",
        department: "Khoa Tim Mạch",
        description: "Khám định kỳ hàng tháng",
        date: new Date(), // Khởi tạo kiểu Date
        status: "CONFIRMED",
        isBlocked: false,
        comment: "Bệnh nhân có tiền sử huyết áp cao"
    };

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
                    <MyAppointmetRowPage meAppointment={appointmentData} />
                </TableBody>
            </Table>

        </Box>


    )
}

export default MyAppointmentsPage;