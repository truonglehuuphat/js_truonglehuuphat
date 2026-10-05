import { useEffect, useState } from "react";
import { useUser } from "../../context/UserProvider";
import { getDoctorByUserId } from "../../services/doctorService";
import { Card, CardContent, Typography } from "@mui/material";
import type { TimeSlot } from "../../types/appointment";
import DoctorAppointmentPage from "./DoctorAppointmentPage";
import { AppointmentProvider } from "../../context/Appointment";

interface DataShow {
    title: string;
    department: string;
    description: string;
    position: string;
    name: string;
}

// Kiểu dữ liệu nhận về từ API
interface DoctorInfoState {
    title?: string;
    department?: {
        id: number;
        name: string;
    };
    description?: string;
    position?: string;
    id: number;
    userId: number;
    timeSlots: TimeSlot[];
    yearsExp: number;
}

const DoctorInfoPage = () => {
    const { user } = useUser();
    const [doctorInfo, setDoctorInfo] = useState<DoctorInfoState>();
    const [isLoadingDoctor, setIsLoadingDoctor] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            if (!user?.id) return; // Kiểm tra bảo vệ khi user chưa load xong

            try {
                setIsLoadingDoctor(true);
                setError("");
                console.log("user.id", user.id);
                const result = await getDoctorByUserId(user.id);
                console.log("result", result);

                // Nếu result trả về có cấu hình Axios (result.data.data) hoặc dữ liệu trực tiếp:
                const data = result?.data?.data || result?.data || result;
                console.log("data", data);
                setDoctorInfo(data);

            } catch (error: any) {
                setIsLoadingDoctor(false);
                setError(error);
            }
        }
        fetchData();
        return () => {
            controller.abort();
        };
    }, [user, isLoadingDoctor])

    if (!isLoadingDoctor) {
        return <Typography>Loading...</Typography>
    }
    if (error) {
        return <Typography color="error">{error}</Typography>;
    }
    if (!doctorInfo) {
        return <Typography>Không tìm thấy thông tin bác sĩ.</Typography>;
    }
    const getDoctorShowInfo = (): DataShow => {
        return {
            title: doctorInfo.title || "Unkown",
            department: doctorInfo.department?.name || "Chưa phân khoa",
            description: doctorInfo.description || "Unkown",
            position: doctorInfo.position || "Unkown",
            name: user.name || "Unkown"
        };
    };
    const doctorData = getDoctorShowInfo();
    return <>
        <Card
            sx={{
                height: "100%",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                transition: "0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                },
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* TITLE */}
                <Typography
                    sx={{
                        textDecoration: "none",
                        color: "text.primary",
                        fontWeight: 600,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: 48,
                    }}
                >{doctorData.title} - {doctorData.name}</Typography>
                <Typography>{doctorData.position}</Typography>
                <Typography
                    sx={{
                        textDecoration: "none",
                        color: "text.primary",
                        fontWeight: 600,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: 48,
                    }}
                > {doctorData.description}</Typography>
            </CardContent>
        </Card>
        <AppointmentProvider>
            <DoctorAppointmentPage userId={doctorInfo.id} />
        </AppointmentProvider>

    </>
}

export default DoctorInfoPage;