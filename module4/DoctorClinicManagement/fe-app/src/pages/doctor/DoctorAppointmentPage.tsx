import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import DoctorAppointmentRowPage, { type DoctorAppointment } from "./DoctorAppointmentRowPage";
import { useUser } from "../../context/UserProvider";
import { doctorContext } from "../../context/DoctorProvider";
import { departContext } from "../../context/DepartmentProvider";


const DoctorAppointmentPage = () => {
    const [search, setSearch] = useState("");
    const { user, setUser, logout } = useUser();
    const { doctor, setDoctor } = doctorContext();
    const { depart, setDepart } = departContext();

    // const mapAppointments = (
    //     appointments: any[],
    //     doctors: any[],
    //     user: any[]
    // ): DoctorAppointment[] => {
    //     return <></>
    // };

    // const mappedAppointments: DoctorAppointment[] = useMemo(() => {
    //     return mapAppointments(appoint, doctor, user);
    // }, []);

    const mappedAppointments: DoctorAppointment[] = [{
        paitentName: "Nguyễn Văn A",
        startTime: new Date(),
        description: "Khám bệnh ",
        date: new Date(),
        status: "Đang chờ",
        comment: ""
    },
    ];

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
                        mappedAppointments.length > 0 ? (
                            mappedAppointments.map((m: any, index: number) => (
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