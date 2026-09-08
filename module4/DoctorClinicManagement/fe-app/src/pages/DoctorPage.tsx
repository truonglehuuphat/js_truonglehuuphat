import { useEffect, useState } from "react";
import type { DoctorInfo } from "../types/doctor";
import DoctorGrid from "./doctor/DoctorGrid";
import { useParams } from "react-router-dom";
import { getAllDoctors, type GetDoctorsParams, type GetDoctorsResponse } from "../services/doctorService";
import EmptyState from "../components/common/EmptyState";

export const doctorList: DoctorInfo[] = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    special: 'Khoa Nội tổng quát',
    title: 'Bác sĩ Chuyên khoa II',
    position: 'Trưởng khoa',
    description:
      'Hơn 20 năm kinh nghiệm khám và điều trị các bệnh lý nội khoa tổng quát.',
    thumbnail: '/images/doctors/doctor-1.jpg',
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    special: 'Khoa Nội tổng quát',
    title: 'Thạc sĩ, Bác sĩ',
    position: 'Bác sĩ điều trị',
    description:
      'Chuyên tư vấn và điều trị các bệnh lý tiêu hóa, huyết áp, tiểu đường.',
    thumbnail: '/images/doctors/doctor-2.jpg',
  },
  {
    id: 3,
    name: 'Lê Văn Cường',
    special: 'Khoa Nội tổng quát',
    title: 'Bác sĩ',
    position: 'Bác sĩ điều trị',
    description:
      'Nhiều năm kinh nghiệm trong khám sức khỏe tổng quát và tầm soát bệnh mãn tính.',
    thumbnail: '/images/doctors/doctor-3.jpg',
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    special: 'Khoa Ngoại',
    title: 'Bác sĩ Chuyên khoa I',
    position: 'Phó khoa',
    description:
      'Chuyên phẫu thuật ngoại tổng quát, giàu kinh nghiệm trong các ca mổ nội soi.',
    thumbnail: '/images/doctors/doctor-4.jpg',
  },
  {
    id: 5,
    name: 'Hoàng Văn Em',
    special: 'Khoa Ngoại',
    title: 'Tiến sĩ, Bác sĩ',
    position: 'Trưởng khoa',
    description:
      'Chuyên gia phẫu thuật ngoại khoa với nhiều công trình nghiên cứu y khoa.',
    thumbnail: '/images/doctors/doctor-5.jpg',
  },
  {
    id: 6,
    name: 'Vũ Thị Phương',
    special: 'Khoa Ngoại',
    title: 'Bác sĩ',
    position: 'Bác sĩ điều trị',
    description: 'Tận tâm chăm sóc bệnh nhân trước và sau phẫu thuật.',
    thumbnail: '/images/doctors/doctor-6.jpg',
  },
  {
    id: 7,
    name: 'Đặng Văn Giang',
    special: 'Khoa Nhi',
    title: 'Bác sĩ Chuyên khoa II',
    position: 'Trưởng khoa',
    description:
      'Hơn 15 năm kinh nghiệm khám và điều trị bệnh lý nhi khoa cho trẻ em mọi lứa tuổi.',
    thumbnail: '/images/doctors/doctor-7.jpg',
  },
  {
    id: 8,
    name: 'Bùi Thị Hoa',
    special: 'Khoa Nhi',
    title: 'Thạc sĩ, Bác sĩ',
    position: 'Bác sĩ điều trị',
    description: 'Chuyên khám và tư vấn dinh dưỡng, tiêm chủng cho trẻ nhỏ.',
    thumbnail: '/images/doctors/doctor-8.jpg',
  },
  {
    id: 9,
    name: 'Ngô Văn Hùng',
    special: 'Khoa Sản',
    title: 'Bác sĩ Chuyên khoa I',
    position: 'Trưởng khoa',
    description:
      'Chuyên khám thai, theo dõi thai kỳ và đỡ sinh với nhiều năm kinh nghiệm.',
    thumbnail: '/images/doctors/doctor-9.jpg',
  },
  {
    id: 10,
    name: 'Dương Thị Huệ',
    special: 'Khoa Sản',
    title: 'Bác sĩ',
    position: 'Bác sĩ điều trị',
    description: 'Tư vấn sức khỏe sinh sản và chăm sóc thai sản toàn diện.',
    thumbnail: '/images/doctors/doctor-10.jpg',
  },
  {
    id: 11,
    name: 'Đỗ Văn Khoa',
    special: 'Khoa Sản',
    title: 'Thạc sĩ, Bác sĩ',
    position: 'Phó khoa',
    description: 'Chuyên phẫu thuật sản khoa và các ca sinh khó.',
    thumbnail: '/images/doctors/doctor-11.jpg',
  },
  {
    id: 12,
    name: 'Lý Thị Lan',
    special: 'Khoa Tim mạch',
    title: 'Bác sĩ Chuyên khoa II',
    position: 'Trưởng khoa',
    description:
      'Chuyên gia đầu ngành về tim mạch, giàu kinh nghiệm can thiệp tim mạch.',
    thumbnail: '/images/doctors/doctor-12.jpg',
  },
  {
    id: 13,
    name: 'Trịnh Văn Minh',
    special: 'Khoa Tim mạch',
    title: 'Tiến sĩ, Bác sĩ',
    position: 'Phó khoa',
    description: 'Chuyên điều trị các bệnh lý mạch vành và suy tim.',
    thumbnail: '/images/doctors/doctor-13.jpg',
  },
  {
    id: 14,
    name: 'Phan Thị Ngọc',
    special: 'Khoa Tim mạch',
    title: 'Bác sĩ',
    position: 'Bác sĩ điều trị',
    description: 'Theo dõi và điều trị các bệnh lý huyết áp, rối loạn nhịp tim.',
    thumbnail: '/images/doctors/doctor-14.jpg',
  },
  {
    id: 15,
    name: 'Vương Văn Phúc',
    special: 'Khoa Da liễu',
    title: 'Bác sĩ Chuyên khoa I',
    position: 'Trưởng khoa',
    description: 'Chuyên điều trị các bệnh lý về da, dị ứng và thẩm mỹ da.',
    thumbnail: '/images/doctors/doctor-15.jpg',
  },
  {
    id: 16,
    name: 'Đinh Thị Quỳnh',
    special: 'Khoa Da liễu',
    title: 'Bác sĩ',
    position: 'Bác sĩ điều trị',
    description: 'Tư vấn và điều trị mụn, nám, các bệnh da liễu thường gặp.',
    thumbnail: '/images/doctors/doctor-16.jpg',
  },
  {
    id: 17,
    name: 'Tô Văn Sơn',
    special: 'Khoa Tai Mũi Họng',
    title: 'Bác sĩ Chuyên khoa II',
    position: 'Trưởng khoa',
    description: 'Nhiều năm kinh nghiệm điều trị bệnh lý tai mũi họng.',
    thumbnail: '/images/doctors/doctor-17.jpg',
  },
  {
    id: 18,
    name: 'Chu Thị Thảo',
    special: 'Khoa Tai Mũi Họng',
    title: 'Thạc sĩ, Bác sĩ',
    position: 'Bác sĩ điều trị',
    description: 'Chuyên khám và điều trị viêm xoang, viêm họng, viêm tai.',
    thumbnail: '/images/doctors/doctor-18.jpg',
  },
  {
    id: 19,
    name: 'Mai Văn Tuấn',
    special: 'Khoa Tai Mũi Họng',
    title: 'Bác sĩ',
    position: 'Bác sĩ điều trị',
    description: 'Tận tâm khám và tư vấn các vấn đề về thính giác.',
    thumbnail: '/images/doctors/doctor-19.jpg',
  },
  {
    id: 20,
    name: 'Lâm Thị Vân',
    special: 'Khoa Mắt',
    title: 'Bác sĩ Chuyên khoa I',
    position: 'Trưởng khoa',
    description:
      'Chuyên khám và điều trị các bệnh lý về mắt, phẫu thuật khúc xạ.',
    thumbnail: '/images/doctors/doctor-20.jpg',
  },
];

const DoctorPage = () => {
  const { id } = useParams();
  const [doctors, setDoctors] = useState<DoctorInfo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("0. fetchData bắt đầu chạy"); // KIỂM TRA 0
  useEffect(() => {
    console.log("1. fetchData bắt đầu chạy"); // KIỂM TRA 1
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        console.log("2. Gọi API:"); // KIỂM TRA 2
        const doctorRes = await getAllDoctors();
        console.log("2. Kết quả API:", doctorRes.doctors); // KIỂM TRA 2
        setDoctors((doctorRes as GetDoctorsResponse).doctors);
      } catch (err: any) {
        console.log("3. Lỗi gặp phải:", err); // KIỂM TRA 3
        if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") {
          return;
        }
        setError("Cannot load doctors right now. Please try again.");
        console.log("Cannot load doctors right now. Please try again."); // KIỂM TRA fail
      } finally {
        console.log("Cannot load doctors right now. finally"); // KIỂM TRA fail
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //   fetchProduct();
  // }, [id]);

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error || !product) {
  //   return <EmptyState message={error || "Product not found"} />;
  // }

  return (
    <>{
      loading ? (<></>) : doctors.length > 0 ? (<DoctorGrid doctorInfo={doctors} />) : (<EmptyState message="No products match current filters." />)
    }

    </>
  )
}

export default DoctorPage;