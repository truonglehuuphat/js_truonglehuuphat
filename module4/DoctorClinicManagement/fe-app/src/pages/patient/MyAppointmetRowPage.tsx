import { Button, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { MeAppointment } from "../../types/appointment";
import CommentIcon from '@mui/icons-material/Comment';
import { deleteAppointment, type deleteTimeSlotDto } from "../../services/appointmentService";
import { useAppointment } from "../../context/Appointment";

export const isCancelable = (appointmentDate: string | Date): boolean => {
    const now = dayjs(); // Thời gian hiện tại
    const appDate = dayjs(appointmentDate); // Thời gian khám

    // Tính khoảng cách theo đơn vị giờ (dạng số thực)
    const hoursDiff = appDate.diff(now, 'hour', true);

    // Phải lớn hơn hoặc bằng 2 tiếng mới cho phép hủy/xóa
    return hoursDiff >= 2;
};

const MyAppointmetRowPage = React.memo(({ meAppointment }: { meAppointment: MeAppointment }) => {
    const { triggerRefresh } = useAppointment();
    const canDelete = isCancelable(meAppointment.date);
    // 2. Tùy chỉnh thông báo hiển thị khi hover chuột
    const tooltipTitle = canDelete
        ? "Hủy lịch hẹn"
        : "Không thể xóa: Lịch hẹn cách thời gian khám dưới 2 tiếng";

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
            // alert(res.message); // Hiển thị: "Xóa lịch thành công"
            triggerRefresh();

            console.log("Xóa lịch thành công");
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Hủy lịch thất bại. thời gian hủy trước 2 tiếng";
            // alert(errorMessage);
            console.log(errorMessage);
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
                    title={tooltipTitle} arrow followCursor
                >
                    <IconButton disabled={!canDelete} onClick={handleDeleteAppoint} >
                        <DeleteIcon > xóa </DeleteIcon>
                    </IconButton>
                </Tooltip>

            </TableCell>
            <TableCell align="right" >
                <CommentIcon> Bình luận </CommentIcon>
            </TableCell>
        </TableRow>
    )
});

export default MyAppointmetRowPage;