import { useEffect, useState } from "react";
import ProfileCard from "./public/ProfilePage"
import EmptyState from "../components/common/EmptyState";
import FindDoctorPage from "./patient/FindDoctorPage";
import CheckMeAppointmentPage from "./patient/CheckMeAppointmentPage";
import MyAppointmentsPage from "./patient/MyAppointmentsPage";
import { UserProvider, useUser } from "../context/UserProvider";


const PatientPage = () => {
    // Lấy thông tin user và trạng thái loading trực tiếp từ Context
    const { user, isLoading } = useUser();
    console.log("user", user)
    // Trạng thái đang tải dữ liệu từ localStorage
    if (!isLoading) {
        return <div>Loading...</div>;
    }
    // 3. Nếu không tìm thấy thông tin user trong localStorage
    if (!user || user.id === 0) {
        return <EmptyState />;
    }

    return (
        <>
            <ProfileCard />
            <FindDoctorPage />
            <MyAppointmentsPage />
        </>
    )
}

export default PatientPage;