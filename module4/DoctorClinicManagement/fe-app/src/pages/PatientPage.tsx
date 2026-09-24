import { useEffect, useState } from "react";
import ProfileCard from "./public/ProfilePage"
import EmptyState from "../components/common/EmptyState";
import FindDoctorPage from "./patient/FindDoctorPage";
import CheckMeAppointmentPage from "./patient/CheckMeAppointmentPage";
import MyAppointmentsPage from "./patient/MyAppointmentsPage";
import { UserProvider, useUser } from "../context/UserProvider";
import { AppointmentProvider } from "../context/Appointment";
import { doctorContext } from "../context/DoctorProvider";
import { departContext } from "../context/DepartmentProvider";


const PatientPage = () => {
    // Lấy thông tin user và trạng thái loading trực tiếp từ Context
    const { user, isLoading } = useUser();
    const [isAppoint, setIsAppoint] = useState(false);
    const { doctor, isDoctorLoading, setDoctor } = doctorContext();
    const { depart, isDepartLoading, setDepart } = departContext();
    // Trạng thái đang tải dữ liệu từ sessionStorage

    if (!isLoading || !isDoctorLoading || !isDepartLoading) {
        console.log("isLoading", isLoading);
        console.log("isDoctorLoading", isDoctorLoading);
        console.log("isDepartLoading", isDepartLoading);
        return <div>Loading...</div>;
    }
    // 3. Nếu không tìm thấy thông tin user trong sessionStorage
    if (!user || user.id === 0) {
        return <EmptyState />;
    }

    return (
        <>
            <ProfileCard />
            <AppointmentProvider> 
                <FindDoctorPage />
                <MyAppointmentsPage />
            </AppointmentProvider>

        </>
    )
}

export default PatientPage;