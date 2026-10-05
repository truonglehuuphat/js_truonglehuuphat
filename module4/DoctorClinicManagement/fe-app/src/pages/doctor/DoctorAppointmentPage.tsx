import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import DoctorAppointmentRowPage, { type DoctorAppointment } from "./DoctorAppointmentRowPage";
import { useUser } from "../../context/UserProvider";
import { getAllAppointmentByDoctor } from "../../services/doctorService";
import { useAppointment } from "../../context/Appointment";


const DoctorAppointmentPage = ({ userId }: { userId: number }) => {
    const [search, setSearch] = useState("");
    const { user } = useUser();
    const [error, setError] = useState("");
    const [appoint, SetAppoint] = useState<DoctorAppointment[]>([]);
    const [loading, setLoading] = useState(true);
    // State quản lý phân trang
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { refreshTrigger } = useAppointment(); // Lấy refreshTrigger từ Context
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
                const raw = result?.data.data;
                // console.log(raw);
                const data: DoctorAppointment[] = raw.map((m: any) => {
                    return {
                        paitentName: m.user.name,
                        startTime: m.timeSlot.startTime,
                        description: m.description,
                        date: m.date,
                        status: m.status,
                        comment: "",
                    }
                })

                SetAppoint(data);
                // console.log("appoint", appoint);
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
    }, [userId, user?.accessToken, refreshTrigger]);

    const filteredAppointments = useMemo(() => {
        if (!appoint || appoint.length === 0) return [];

        // Đã tích hợp sẵn lọc theo ô Tìm kiếm (search)
        return appoint.filter((item: any) =>
            item?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
            item?.description?.toLowerCase().includes(search.toLowerCase())
        );
    }, [appoint, search]);

    // Cắt danh sách (slice) tương ứng với trang hiện tại
    const paginatedAppointments = useMemo(() => {
        const startIndex = page * rowsPerPage;
        return filteredAppointments.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredAppointments, page, rowsPerPage]);

    // Hàm xử lý thay đổi trang
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // Hàm xử lý thay đổi số lượng hàng hiển thị
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset về trang đầu tiên
    };

    // Reset về trang 0 mỗi khi người dùng gõ tìm kiếm
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(0);
    };

    return <>
        <Box sx={{ p: 3 }}>
            <Typography variant="h5">Lịch hẹn khám</Typography>
            <TextField
                label="Tìm kiếm bệnh nhân, nội dung..."
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={search}
                onChange={handleSearchChange}
            />

            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

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
                        loading ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <CircularProgress size={28} />
                                </TableCell>
                            </TableRow>
                        ) : paginatedAppointments.length > 0 ? (
                            paginatedAppointments.map((m: any, index: number) => (
                                <DoctorAppointmentRowPage key={m.id || index} doctorAppointment={m} />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    Không tìm thấy lịch hẹn phù hợp.
                                </TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table >
            {/* Thêm Component TablePagination ngay bên dưới Bảng */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]} // Lựa chọn số hàng hiển thị
                component="div"
                count={filteredAppointments.length} // Tổng số bản ghi (sau khi đã search)
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số hàng mỗi trang:"
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}–${to} trong tổng số ${count !== -1 ? count : `hơn ${to}`}`
                }
            />
        </Box >
    </>
}

export default DoctorAppointmentPage;