import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../src/generated/prisma/client";
import { Gender, StatusDoctor, TimeType, StatusAppointment, Role } from "../src/generated/prisma/enums";
import { fakerVI as faker } from '@faker-js/faker'; // Sử dụng locale Tiếng Việt

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

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
  console.log('Bắt đầu tạo dữ liệu mẫu...');

  // 1. Tạo 1 Khoa (Department) để gán cho các Bác sĩ
  const departmentNames = [
    'Khoa Nội chung',
    'Khoa Ngoại tổng quát',
    'Khoa Nhi',
    'Khoa Sản - Phụ khoa',
    'Khoa Tai Mũi Họng',
    'Khoa Răng Hàm Mặt',
    'Khoa Mắt',
    'Khoa Da Liễu',
    'Khoa Tim mạch',
    'Khoa Cơ xương khớp'
  ];

  await prisma.department.createMany({
    data: departmentNames.map((name) => ({ name })),
  });

  // 2. Tạo 5 Admins
  const admins = [];
  for (let i = 1; i <= 5; i++) {
    admins.push({
      name: `Admin ${i}`,
      gender: Gender.male,
      email: `admin${i}@clinic.com`,
      phone: `090000000${i}`,
      password: 'hashedpassword123',
      datebirth: new Date('1990-01-01'),
      role: Role.admin, // Note: Đây là trường role trong schema của bạn
    });
  }
  await prisma.user.createMany({ data: admins });
  console.log('✅ Đã tạo 5 Admin');


  // Lấy danh sách các khoa vừa tạo để gán cho Bác sĩ
  const departments = await prisma.department.findMany();
  console.log(`✅ Đã tạo ${departments.length} Khoa (Department)`);

  // ... (Giữ nguyên Bước 2: Tạo 5 Admins) ...

  // 3. Tạo 20 Doctors (Phân bổ ngẫu nhiên vào các khoa)
  const doctorsData = [];
  for (let i = 1; i <= 20; i++) {
    // Lấy ngẫu nhiên 1 khoa từ danh sách departments
    const randomDepartment = departments[Math.floor(Math.random() * departments.length)];

    const user = await prisma.user.create({
      data: {
        name: `Bác sĩ ${i}`,
        gender: i % 2 === 0 ? Gender.female : Gender.male,
        email: `doctor${i}@clinic.com`,
        phone: `09100000${i < 10 ? '0' + i : i}`,
        password: 'hashedpassword123',
        datebirth: new Date('1985-05-15'),
        role: Role.doctor,
        doctors: {
          create: {
            status: StatusDoctor.active,
            departmentId: randomDepartment.id, // Gán ID khoa ngẫu nhiên
          }
        }
      },
      include: { doctors: true }
    });
    doctorsData.push(user.doctors[0]);
  }
  console.log('✅ Đã tạo 20 Bác sĩ và phân bổ vào các chuyên khoa');

  // 4. Tạo 100 Patients
  const patientsData = [];
  for (let i = 1; i <= 100; i++) {
    patientsData.push({
      name: `Bệnh nhân ${i}`,
      gender: i % 2 === 0 ? Gender.female : Gender.male,
      email: `patient${i}@gmail.com`,
      phone: `0920000${i < 100 ? (i < 10 ? '00' + i : '0' + i) : i}`,
      password: 'hashedpassword123',
      datebirth: new Date('2000-10-10'),
      role: Role.patient,
    });
  }
  await prisma.user.createMany({ data: patientsData });

  // Lấy danh sách ID bệnh nhân để tạo lịch
  const allPatients = await prisma.user.findMany({ where: { role: Role.patient } });
  console.log('✅ Đã tạo 100 Bệnh nhân');

  // 5. Tạo 200 Lịch khám (Appointments)
  const appointmentsData = [];

  // Helper lấy random
  const getRandomPatientId = () => allPatients[Math.floor(Math.random() * allPatients.length)].id;
  const getRandomDoctorId = () => doctorsData[Math.floor(Math.random() * doctorsData.length)].id;
  const getRandomTimeType = () => [TimeType.morning, TimeType.afternoon, TimeType.evening][Math.floor(Math.random() * 3)];

  // a) 100 lịch khám ĐÃ HOÀN TẤT (Done) - Date ở quá khứ
  for (let i = 0; i < 100; i++) {
    appointmentsData.push({
      userId: getRandomPatientId(),
      doctorId: getRandomDoctorId(),
      date: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30) - 1)), // Quá khứ
      timeType: getRandomTimeType(),
      status: StatusAppointment.Done,
      description: 'Đã hoàn tất quá trình khám bệnh.',
    });
  }

  // b) 90 lịch khám SẮP TỚI (Active/Pending) - Date ở tương lai
  for (let i = 0; i < 90; i++) {
    appointmentsData.push({
      userId: getRandomPatientId(),
      doctorId: getRandomDoctorId(),
      date: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 14) + 1)), // Tương lai (trong vòng 14 ngày tới)
      timeType: getRandomTimeType(),
      status: StatusAppointment.Active, // Dùng Active cho "sắp tới"
      description: 'Khám định kỳ tổng quát.',
    });
  }

  // c) 10 lịch khám HỦY (Cancelled)
  for (let i = 0; i < 10; i++) {
    appointmentsData.push({
      userId: getRandomPatientId(),
      doctorId: getRandomDoctorId(),
      date: new Date(),
      timeType: getRandomTimeType(),
      status: StatusAppointment.Cancelled,
      description: 'Bệnh nhân bận việc đột xuất nên hủy.',
    });
  }

  await prisma.appointment.createMany({ data: appointmentsData });
  console.log('✅ Đã tạo 200 Lịch khám (100 Done, 90 Active, 10 Cancelled)');
  console.log('🎉 Hoàn tất seed dữ liệu!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });