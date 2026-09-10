import { useEffect, useState } from "react";

const MyAppointmentsPage = () => {
    const [appoint, SetAppoint] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        try {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    setError("");
                    // console.log("2. Gọi API:"); // KIỂM TRA 2
                    const result = await getUserAppointment();
                    // console.log("2. Kết quả API:", doctorRes.doctors); // KIỂM TRA 2
                    SetAppoint(result);
                } catch (err: any) {
                    // console.log("3. Lỗi gặp phải:", err); // KIỂM TRA 3
                    if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") {
                        return;
                    }
                    setError("Cannot load your Appointment right now. Please try again.");
                    // console.log("Cannot load doctors right now. Please try again."); // KIỂM TRA fail
                } finally {
                    // console.log("Cannot load doctors right now. finally"); // KIỂM TRA fail
                    setLoading(false);
                }
            };

            fetchData();
        } catch (error) {

        }
    }, []);


    return (

    )
}

export default MyAppointmentsPage;