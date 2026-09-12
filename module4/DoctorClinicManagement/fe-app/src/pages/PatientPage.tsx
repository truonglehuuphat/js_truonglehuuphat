import { useEffect, useState } from "react";
import ProfileCard from "./public/ProfilePage"
import EmptyState from "../components/common/EmptyState";
import FindDoctorPage from "./patient/FindDoctorPage";


const PatientPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoadingInfo, setIsLoadingInfo] = useState(false);
    useEffect(() => {
        // Lấy chuỗi dữ liệu từ localStorage (thay 'userData' bằng key bạn đã lưu)
        const storedData = localStorage.getItem('User');

        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                // console.log("Dữ liệu vừa lấy từ localStorage:", parsedData.user);
                // console.log("parsedData ", parsedData);
                // Truy xuất vào object 'user' bên trong dữ liệu đã lưu
                setUserInfo(parsedData.user);
                setIsLoadingInfo(true);
            } catch (error) {
                console.error("Lỗi parse dữ liệu từ localStorage:", error);
            }
        }
    }, []);

    useEffect(() => {
        // console.log("userInfo sau khi state đã thay đổi:", userInfo);
    }, [userInfo]);

    // Trạng thái đang tải dữ liệu từ localStorage
    if (!isLoadingInfo) {
        return <div>Loading...</div>;
    }
    // 3. Nếu không tìm thấy thông tin user trong localStorage
    if (!userInfo) {
        return <EmptyState />;
    }

    return (
        <>
            <ProfileCard userInfo={userInfo} />
            <FindDoctorPage userInfo={userInfo}/>
        </>
    )
}

export default PatientPage;