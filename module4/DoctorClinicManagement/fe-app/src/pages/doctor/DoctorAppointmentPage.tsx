import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import DoctorAppointmentRowPage, { type DoctorAppointment } from "./DoctorAppointmentRowPage";
import { useUser } from "../../context/UserProvider";
import { getAllAppointmentByDoctor } from "../../services/doctorService";


const DoctorAppointmentPage = ({ userId }: { userId: number }) => {
    const [search, setSearch] = useState("");
    const { user } = useUser();
    const [error, setError] = useState("");
    const [appoint, SetAppoint] = useState<DoctorAppointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        // if (!user?.accessToken) {
        //     return;
        // }
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");
                console.log("user", user)
                const result = await getAllAppointmentByDoctor(userId);
                // console.log("2. Kết quả API:", doctorRes.doctors); // KIỂM TRA 2
                SetAppoint(result?.data.data);
                console.log("appoint", appoint);
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
    }, [userId, user?.accessToken]);

    const filteredAppointments = useMemo(() => {
        if (!appoint || appoint.length === 0) return [];

        // Đã tích hợp sẵn lọc theo ô Tìm kiếm (search)
        return appoint.filter((item: any) =>
            item?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
            item?.description?.toLowerCase().includes(search.toLowerCase())
        );
    }, [appoint, search]);

    return <>
        <Box sx={{ p: 3 }}>
            <Typography variant="h5">Lịch hẹn khám</Typography>
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
                        <TableCell align="center">Ngày</TableCell>
                        <TableCell align="center">Giờ</TableCell>
                        <TableCell align="center">Bệnh Nhân</TableCell>
                        <TableCell align="center">Nội dung khám</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                        <TableCell align="center">Sửa</TableCell>
                        <TableCell align="center">xóa</TableCell>
                        <TableCell align="center">viết bình luận</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        filteredAppointments.length > 0 ? (
                            filteredAppointments.map((m: any, index: number) => (
                                <DoctorAppointmentRowPage key={m.id || index} doctorAppointment={m} />
                            ))) : (
                            <></>
                        )
                    }
                </TableBody>
            </Table>
        </Box>

    </>
}

export default DoctorAppointmentPage;