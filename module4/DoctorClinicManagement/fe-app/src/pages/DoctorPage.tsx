import { useEffect, useState } from "react";
import type { DoctorInfo } from "../types/doctor";
import DoctorGrid from "./doctor/DoctorGrid";
import { useParams } from "react-router-dom";
import { getAllDoctors, type GetDoctorsParams, type GetDoctorsResponse } from "../services/doctorService";
import EmptyState from "../components/common/EmptyState";

const DoctorPage = () => {
  const { id } = useParams();
  const [doctors, setDoctors] = useState<DoctorInfo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("0. fetchData bắt đầu chạy"); // KIỂM TRA 0
  useEffect(() => {
    // console.log("1. fetchData bắt đầu chạy"); // KIỂM TRA 1
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        // console.log("2. Gọi API:"); // KIỂM TRA 2
        const doctorRes = await getAllDoctors();
        // console.log("2. Kết quả API:", doctorRes.doctors); // KIỂM TRA 2
        setDoctors((doctorRes as GetDoctorsResponse).doctors);
      } catch (err: any) {
        // console.log("3. Lỗi gặp phải:", err); // KIỂM TRA 3
        if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") {
          return;
        }
        setError("Cannot load doctors right now. Please try again.");
        // console.log("Cannot load doctors right now. Please try again."); // KIỂM TRA fail
      } finally {
        // console.log("Cannot load doctors right now. finally"); // KIỂM TRA fail
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>{
      loading ? (<></>) : doctors.length > 0 ? (<DoctorGrid doctorInfo={doctors} />) : (<EmptyState message="No products match current filters." />)
    }

    </>
  )
}

export default DoctorPage;