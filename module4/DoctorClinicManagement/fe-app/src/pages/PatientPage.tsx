import { useEffect, useState } from "react";
import ProfileCard from "./public/ProfilePage"
import EmptyState from "../components/common/EmptyState";


const PatientPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        // Lấy chuỗi dữ liệu từ localStorage (thay 'userData' bằng key bạn đã lưu)
        const storedData = localStorage.getItem('User');
        console.log(storedData);
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                // Truy xuất vào object 'user' bên trong dữ liệu đã lưu
                setUserInfo(parsedData);
                console.log(userInfo);
            } catch (error) {
                console.error("Lỗi parse dữ liệu từ localStorage:", error);
            }
        }
    }, []);

    if(userInfo === null){
        return <EmptyState />
    }
    return (
        <>
        
            <ProfileCard userInfo={userInfo} />
        </>
    )
}

export default PatientPage;