import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../src/generated/prisma/client";
import { Gender, StatusDoctor, TimeType, StatusAppointment, Role } from "../src/generated/prisma/enums";
import { fakerVI as faker } from '@faker-js/faker'; // Sử dụng locale Tiếng Việt
import bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })




function randomDateBetween(start: Date, end: Date): Date {
  const s = start.getTime();
  const e = end.getTime();
  return new Date(s + Math.random() * (e - s));
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  console.log('Bắt đầu dọn dẹp dữ liệu cũ...');
  await prisma.billItem.deleteMany();
  await prisma.bill.deleteMany();
  await prisma.history.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.medical.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();

  const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
  const hashedPassword = await bcrypt.hash("123456", SALT_ROUNDS);

  console.log("Bắt đầu tạo dữ liệu mẫu...");

  // 1. Tạo 10 Khoa (Departments)
  const departmentsData = [
    "Khoa Nội", "Khoa Ngoại", "Khoa Nhi", "Khoa Sản", "Khoa Tim Mạch",
    "Khoa Thần Kinh", "Khoa Da Liễu", "Khoa Tai Mũi Họng", "Khoa Mắt", "Khoa Răng Hàm Mặt"
  ];
  
  const departments = [];
  for (const name of departmentsData) {
    const dept = await prisma.department.create({ data: { name } });
    departments.push(dept);
  }
  console.log(`Đã tạo ${departments.length} khoa.`);

  // 2. Tạo 3 Admin
  for (let i = 1; i <= 3; i++) {
    await prisma.user.create({
      data: {
        name: `Admin ${i}`,
        gender: i % 2 === 0 ? "female" : "male",
        email: `admin${i}@clinic.com`,
        phone: `090000000${i}`,
        password: hashedPassword,
        datebirth: new Date("1990-01-01"),
        role: "admin",
        address: "TP HCM",
      }
    });
  }
  console.log("Đã tạo 3 admin.");

  // 3. Tạo 20 Bệnh nhân (Patients)
  const patients = [];
  for (let i = 1; i <= 20; i++) {
    const patient = await prisma.user.create({
      data: {
        name: `Bệnh nhân ${i}`,
        gender: i % 2 === 0 ? "female" : "male",
        email: `patient${i}@clinic.com`,
        phone: `09100000${i < 10 ? '0'+i : i}`,
        password: hashedPassword,
        datebirth: new Date("2000-05-15"),
        role: "patient",
        address: "Hà Nội",
      }
    });
    patients.push(patient);
  }
  console.log("Đã tạo 20 bệnh nhân.");

  // 4. Tạo 20 Bác sĩ (Users + Doctors)
  const doctors = [];
  for (let i = 1; i <= 20; i++) {
    const doctorUser = await prisma.user.create({
      data: {
        name: `Bác sĩ ${i}`,
        gender: i % 2 === 0 ? "female" : "male",
        email: `doctor${i}@clinic.com`,
        phone: `09200000${i < 10 ? '0'+i : i}`,
        password: hashedPassword,
        datebirth: new Date("1985-08-20"),
        role: "doctor",
        address: "Đà Nẵng",
      }
    });

    const doctor = await prisma.doctor.create({
      data: {
        userId: doctorUser.id,
        departmentId: departments[i % 10].id, // Phân đều vào 10 khoa
        description: `Chuyên gia y tế ${i} với nhiều năm kinh nghiệm`,
        position: "Bác sĩ chuyên khoa",
        title: i % 2 === 0 ? "Tiến sĩ" : "Thạc sĩ",
        yearsExp: Math.floor(Math.random() * 15) + 3,
        status: "active"
      }
    });
    doctors.push(doctor);
  }
  console.log("Đã tạo 20 bác sĩ.");

  // 5. Tạo 20 Lịch khám đã hoàn thành (Done) + 20 History (thay cho Review)
  for (let i = 0; i < 20; i++) {
    const patient = patients[i];
    const doctor = doctors[i % 20];

    await prisma.appointment.create({
      data: {
        userId: patient.id,
        doctorId: doctor.id,
        date: new Date(new Date().setDate(new Date().getDate() - (i + 1))), // Các ngày trước đó
        timeType: i % 2 === 0 ? "morning" : "afternoon",
        status: "Done",
        description: `Khám tổng quát lần ${i + 1}`,
      }
    });

    // Tạo History tương ứng với lịch khám Done (giả lập Review/Kết quả khám)
    await prisma.history.create({
      data: {
        description: `Bệnh nhân sức khỏe ổn định. Cần theo dõi thêm. (Đánh giá/Review ${i + 1})`,
        date: new Date(),
        doctorId: doctor.id,
        patientId: patient.id,
      }
    });
  }
  console.log("Đã tạo 20 lịch khám hoàn thành và 20 hồ sơ bệnh án (history).");

  // 6. Tạo 10 Lịch khám mới (Pending)
  for (let i = 0; i < 10; i++) {
    const patient = patients[i]; // Lấy 10 bệnh nhân đầu tiên
    const doctor = doctors[(i + 5) % 20]; // Chọn ngẫu nhiên bác sĩ khác

    await prisma.appointment.create({
      data: {
        userId: patient.id,
        doctorId: doctor.id,
        date: new Date(new Date().setDate(new Date().getDate() + (i + 1))), // Các ngày trong tương lai
        timeType: "evening",
        status: "Pending",
        description: `Tái khám tình trạng đau đầu lần ${i + 1}`,
      }
    });
  }
  console.log("Đã tạo 10 lịch khám mới (Pending).");
  console.log("Seed dữ liệu thành công!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });