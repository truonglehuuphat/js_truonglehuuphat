import { Button, TableCell, TableRow, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { MeAppointment } from "../../types/appointment";
import CommentIcon from '@mui/icons-material/Comment';
import { deleteAppointment, type deleteTimeSlotDto } from "../../services/appointmentService";
import { useAppointment } from "../../context/Appointment";

const MyAppointmetRowPage = React.memo(({ meAppointment }: { meAppointment: MeAppointment }) => {
    const { triggerRefresh } = useAppointment();

    const handleDeleteAppoint = async () => {
        console.log("delete appointment")
        const data: deleteTimeSlotDto = {
            userId: meAppointment.userId,
            appointmentId: meAppointment.appointmentId,
            timeSlotId: meAppointment.timeSlotId,
            date: meAppointment.date,
            startTime: meAppointment.startTime,
        }
        try {
            // console.log("data", data)
            const res = await deleteAppointment(data);
            // 2. Lấy message thành công từ BE
            alert(res.message); // Hiển thị: "Xóa lịch thành công"
            triggerRefresh();
            
            console.log("Xóa lịch thành công");
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Hủy lịch thất bại. thời gian hủy trước 2 tiếng";
            alert(errorMessage);
        }

    }

    return (
        <TableRow hover>
            <TableCell sx={{ fontWeight: "bold", color: "#1a237e" }} >{meAppointment.doctorName}</TableCell>
            <TableCell align="right" >{meAppointment.department}</TableCell>
            <TableCell align="right" >{meAppointment.description}</TableCell>
            <TableCell align="right" >{dayjs(meAppointment.date).format('DD/MM/YYYY HH:mm')}</TableCell>
            <TableCell align="right" >{meAppointment.status}</TableCell>
            <TableCell align="right" >
                <ModeEditIcon> sửa </ModeEditIcon>
            </TableCell>
            <TableCell align="right">
                <Tooltip
                    title="Xóa lịch phải trước 2 tiếng"
                    arrow
                    followCursor // 👈 Giúp dòng chữ xuất hiện ngay tại vị trí con trỏ chuột
                    placement="top"
                >
                    <DeleteIcon onClick={handleDeleteAppoint} > xóa </DeleteIcon>
                </Tooltip>

            </TableCell>
            <TableCell align="right" >
                <CommentIcon> Bình luận </CommentIcon>
            </TableCell>
        </TableRow>
    )
});

export default MyAppointmetRowPage;