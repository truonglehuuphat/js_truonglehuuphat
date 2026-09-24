import { Grid } from "@mui/material";
import MenuPage from "./MenuPage";
import RegisterPage from "./RegisterPage";
import { useEffect, useState } from "react";
import type { Department } from "../types/department";
import type DoctorInfo from "./doctor/DoctorInfo";
import { getDepartments } from "../services/departmentService";
import { getAllDoctors } from "../services/doctorService";
import { doctorContext } from "../context/DoctorProvider";
import { departContext } from "../context/DepartmentProvider";


const HomePage = () => {
    // const [doctors, setDoctors] = useState<DoctorInfo[] | null>(null);
    // const [departments, setDepartments] = useState<Department[] | null>(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState("");
    const { setDoctor } = doctorContext();
    const {setDepart} = departContext();
    useEffect(() => {
        // 1. Khởi tạo AbortController
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                // setLoading(true);
                // setError("");

                const doctorRes = await getAllDoctors();
                const departmentsRes = await getDepartments();
                console.log(departmentsRes);
                console.log(doctorRes);
                // setDepart(departmentsRes);
                // setDoctor(doctorRes);
                // console.log(departmentsRes);
                sessionStorage.setItem("department", JSON.stringify(departmentsRes));
                sessionStorage.setItem("doctors",JSON.stringify(doctorRes.doctors));

            } catch (err: any) {
                if (err?.name === "CanceledError" || err?.code === "ER  R_CANCELED") {
                    return;
                }
                // setError("Cannot load doctor and department right now. Please try again.");
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
        return () => {
            controller.abort();
        };
    }, []);

    return (
        <>
            <Grid
                container
                spacing={0}
                sx={{
                    // minHeight: '50vh',
                    // justifyContent: "center", // Canh giữa theo chiều ngang
                    // alignItems: "center"     // Canh giữa theo chiều dọc
                }} // Thêm dòng này nếu muốn căn giữa toàn màn hình
            >
                <Grid size={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <RegisterPage />
                </Grid>
                <Grid size={4} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <MenuPage />
                </Grid>
            </Grid>
        </>
    )
}

export default HomePage;