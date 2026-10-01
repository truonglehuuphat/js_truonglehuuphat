import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export interface DoctorAppointment {
    paitentName: string,
    startTime: Date,
    description: string;
    date: Date;
    status: string;
    comment: string;
}

const DoctorAppointmentRowPage = React.memo(({ doctorAppointment }: { doctorAppointment: DoctorAppointment }) => {


    const tooltipTitle = "Lịch hẹn cách thời gian khám dưới 2 tiếng";
    return (
        <TableRow>
            <TableCell align="center" >{dayjs(doctorAppointment.date).format('DD/MM/YYYY')}</TableCell>
            <TableCell align="center" >{dayjs(doctorAppointment.startTime).format('HH:MM')}</TableCell>
            <TableCell align="center" >{doctorAppointment.paitentName}</TableCell>
            <TableCell align="center" >{doctorAppointment.description}</TableCell>
            <TableCell align="center" >{doctorAppointment.status}</TableCell>
            <TableCell align="center" >
                <ModeEditIcon> sửa </ModeEditIcon>
            </TableCell>
            <TableCell align="center">
                <Tooltip
                    title={tooltipTitle} arrow followCursor
                >
                    <DeleteIcon > xóa </DeleteIcon>
                </Tooltip>
            </TableCell>
            <TableCell align="center" >
                <CommentIcon> Bình luận </CommentIcon>
            </TableCell>
        </TableRow>
    )
});

export default DoctorAppointmentRowPage;