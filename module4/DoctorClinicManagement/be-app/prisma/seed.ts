import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../src/generated/prisma/client";
import { Gender, StatusDoctor, TimeType, StatusAppointment, Role } from "../src/generated/prisma/enums";
import { fakerVI as faker } from '@faker-js/faker'; // Sử dụng locale Tiếng Việt

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const DEFAULT_PASSWORD = '123456';
 
function randomDateBetween(start: Date, end: Date): Date {
  const s = start.getTime();
  const e = end.getTime();
  return new Date(s + Math.random() * (e - s));
}
 
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
 
async function main() {
  console.log('🌱 Bắt đầu seed dữ liệu...');
 
  // ---------------------------------------------------------------------
  // 1. Departments (Khoa)
  // ---------------------------------------------------------------------
  const departmentNames = [
    'Khoa Nội tổng quát',
    'Khoa Ngoại',
    'Khoa Nhi',
    'Khoa Sản phụ khoa',
    'Khoa Tim mạch',
  ];
 
  const departments = [];
  for (const name of departmentNames) {
    const dept = await prisma.department.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    departments.push(dept);
  }
  console.log(`✅ Đã tạo ${departments.length} khoa`);
 
  // ---------------------------------------------------------------------
  // 2. Admins (3 tài khoản)
  // ---------------------------------------------------------------------
  const adminData = [
    { name: 'Nguyễn Văn Admin', email: 'admin1@hospital.vn', gender: Gender.male },
    { name: 'Trần Thị Quản Trị', email: 'admin2@hospital.vn', gender: Gender.female },
    { name: 'Lê Hoàng Admin', email: 'admin3@hospital.vn', gender: Gender.male },
  ];
 
  for (const [i, a] of adminData.entries()) {
    await prisma.user.upsert({
      where: { email: a.email },
      update: {},
      create: {
        name: a.name,
        gender: a.gender,
        email: a.email,
        phone: `09${(10000000 + i).toString().padStart(8, '0')}`,
        password: DEFAULT_PASSWORD,
        datebirth: new Date(1985 + i, i, 15),
        role: Role.admin,
        address: `${i + 1} Đường Lê Lợi, Quận 1, TP.HCM`,
      },
    });
  }
  console.log(`✅ Đã tạo ${adminData.length} admin`);
 
  // ---------------------------------------------------------------------
  // 3. Doctors (10 bác sĩ: tạo User role=doctor + hồ sơ Doctor)
  // ---------------------------------------------------------------------
  const doctorNames = [
    'BS. Phạm Minh Tuấn',
    'BS. Nguyễn Thị Lan',
    'BS. Trần Văn Hùng',
    'BS. Lê Thị Hoa',
    'BS. Đỗ Quang Huy',
    'BS. Vũ Thị Mai',
    'BS. Bùi Anh Dũng',
    'BS. Ngô Thị Thu',
    'BS. Đặng Văn Long',
    'BS. Hoàng Thị Ngọc',
  ];
 
  const positions = ['Bác sĩ điều trị', 'Trưởng khoa', 'Phó khoa', 'Bác sĩ tư vấn'];
  const titles = ['Thạc sĩ', 'Tiến sĩ', 'Bác sĩ CKI', 'Bác sĩ CKII', 'Giáo sư'];
 
  const doctors = [];
  for (const [i, name] of doctorNames.entries()) {
    const email = `doctor${i + 1}@hospital.vn`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name,
        gender: i % 2 === 0 ? Gender.male : Gender.female,
        email,
        phone: `09${(20000000 + i).toString().padStart(8, '0')}`,
        password: DEFAULT_PASSWORD,
        datebirth: new Date(1975 + i, (i * 2) % 12, (i % 28) + 1),
        role: Role.doctor,
        address: `${i + 10} Đường Nguyễn Huệ, Quận 1, TP.HCM`,
      },
    });
 
    const doctor = await prisma.doctor.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        status: StatusDoctor.active,
        departmentId: departments[i % departments.length].id,
        description: `${name} có nhiều năm kinh nghiệm trong khám và điều trị chuyên khoa.`,
        position: pick(positions),
        title: pick(titles),
        yearsExp: 3 + (i % 15),
      },
    });
    doctors.push(doctor);
  }
  console.log(`✅ Đã tạo ${doctors.length} bác sĩ`);
 
  // ---------------------------------------------------------------------
  // 4. Patients (20 bệnh nhân)
  // ---------------------------------------------------------------------
  const patientFirstNames = [
    'Nguyễn Văn An', 'Trần Thị Bích', 'Lê Văn Cường', 'Phạm Thị Duyên',
    'Hoàng Văn Em', 'Vũ Thị Phương', 'Đặng Văn Giang', 'Bùi Thị Hạnh',
    'Ngô Văn Inh', 'Đỗ Thị Kim', 'Trịnh Văn Long', 'Mai Thị Mến',
    'Phan Văn Nam', 'Lý Thị Oanh', 'Dương Văn Phúc', 'Đoàn Thị Quỳnh',
    'Tô Văn Sơn', 'Chu Thị Tâm', 'Lương Văn Út', 'Vương Thị Vân',
  ];
 
  const patients = [];
  for (const [i, name] of patientFirstNames.entries()) {
    const email = `patient${i + 1}@example.com`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name,
        gender: i % 2 === 0 ? Gender.male : Gender.female,
        email,
        phone: `03${(30000000 + i).toString().padStart(8, '0')}`,
        password: DEFAULT_PASSWORD,
        datebirth: new Date(1960 + (i % 45), i % 12, (i % 28) + 1),
        role: Role.patient,
        address: `${i + 1} Đường Cách Mạng Tháng Tám, Quận 3, TP.HCM`,
      },
    });
    patients.push(user);
  }
  console.log(`✅ Đã tạo ${patients.length} bệnh nhân`);
 
  // ---------------------------------------------------------------------
  // 5. Appointments (20 lịch khám mẫu)
  // ---------------------------------------------------------------------
  const timeTypes = [TimeType.morning, TimeType.afternoon, TimeType.evening];
  const statuses = [
    StatusAppointment.Done,
    StatusAppointment.Pending,
    StatusAppointment.Active,
    StatusAppointment.Cancelled,
  ];
  const descriptions = [
    'Khám tổng quát định kỳ',
    'Đau bụng, cần kiểm tra tiêu hóa',
    'Tái khám sau phẫu thuật',
    'Khám thai định kỳ',
    'Kiểm tra huyết áp, tim mạch',
    'Sốt, ho kéo dài',
    'Đau lưng, khớp gối',
    'Khám sức khỏe tổng quát cho trẻ em',
    'Tư vấn dinh dưỡng',
    'Khám da liễu',
  ];
 
  const rangeStart = new Date('2025-01-01');
  const rangeEnd = new Date('2025-12-31');
 
  let created = 0;
  for (let i = 0; i < 20; i++) {
    const patient = patients[i % patients.length];
    const doctor = doctors[i % doctors.length];
 
    await prisma.appointment.create({
      data: {
        userId: patient.id,
        doctorId: doctor.id,
        date: randomDateBetween(rangeStart, rangeEnd),
        timeType: pick(timeTypes),
        status: pick(statuses),
        description: pick(descriptions),
      },
    });
    created++;
  }
  console.log(`✅ Đã tạo ${created} lịch khám`);
 
  console.log('🎉 Seed dữ liệu hoàn tất!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });