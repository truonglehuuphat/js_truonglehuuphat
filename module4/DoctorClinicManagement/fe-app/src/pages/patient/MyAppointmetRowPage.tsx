import { Button, TableCell, TableRow } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { MeAppointment } from "../../types/appointment";
import CommentIcon from '@mui/icons-material/Comment';

const MyAppointmetRowPage = React.memo(({ meAppointment }: { meAppointment: MeAppointment }) => {

    const handleDeleteAppoint = async() => {
        console.log("delete appointment")
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
            <TableCell align="right" onClick={handleDeleteAppoint} >
                <DeleteIcon> xóa </DeleteIcon>
            </TableCell>
            <TableCell align="right" >
                <CommentIcon> Bình luận </CommentIcon>
            </TableCell>
        </TableRow>
    )
});

export default MyAppointmetRowPage;