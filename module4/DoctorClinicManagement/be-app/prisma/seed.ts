import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../src/generated/prisma/client";
import { Gender, StatusDoctor, TimeType, StatusAppointment, Role, DayOfWeek } from "../src/generated/prisma/enums";
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

const DAYS_OF_WEEK: DayOfWeek[] = [
  DayOfWeek.sunday,
  DayOfWeek.monday,
  DayOfWeek.tuesday,
  DayOfWeek.wednesday,
  DayOfWeek.thursday,
  DayOfWeek.friday,
  DayOfWeek.saturday,
];

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
  console.log('--- Tạo 40 Bệnh nhân (Patients) ---');
  const patientUsers = [];
  for (let i = 1; i <= 40; i++) {
    const isMale = i % 2 !== 0;
    const patient = await prisma.user.create({
      data: {
        name: `Bệnh nhân ${i}`,
        gender: isMale ? Gender.male : Gender.female,
        email: `benhnhan${i}@gmail.com`,
        phone: `09123456${i < 10 ? '0' + i : i}`,
        password: hashedPassword,
        datebirth: new Date(1990, (i % 12), (i % 28) + 1),
        address: `Số ${i} Đường Lớn, TP. Hồ Chí Minh`,
        role: Role.patient,
      },
    });
    patientUsers.push(patient);
  }

  // 4. Tạo 20 Bác sĩ (Users + Doctors)
  console.log('--- Tạo 20 Bác sĩ (Doctors) ---');
  const doctorRecords = [];
  for (let i = 1; i <= 20; i++) {
    const isMale = i % 2 !== 0;
    const dept = departments[i % departments.length];

    // 1. Tạo User tài khoản cho Bác sĩ
    const userDoctor = await prisma.user.create({
      data: {
        name: `Bác sĩ ${i}`,
        gender: isMale ? Gender.male : Gender.female,
        email: `doctor${i}@clinic.com`,
        phone: `09876543${i < 10 ? '0' + i : i}`,
        password: hashedPassword,
        datebirth: new Date(1980, (i % 12), (i % 28) + 1),
        address: `Khu tập thể Bệnh viện, TP. Hồ Chí Minh`,
        role: Role.doctor,
      },
    });

    // 2. Tạo thông tin Doctor tương ứng
    const doctor = await prisma.doctor.create({
      data: {
        userId: userDoctor.id,
        departmentId: dept.id,
        status: StatusDoctor.active,
        description: `Chuyên gia về ${dept.name} với kinh nghiệm điều trị chuyên sâu.`,
        position: i % 2 === 0 ? 'Trưởng khoa' : 'Bác sĩ chuyên khoa',
        title: i % 3 === 0 ? 'PGS.TS' : 'Thạc sĩ, Bác sĩ',
        yearsExp: 5 + (i % 15),
      },
    });
    doctorRecords.push(doctor);
  }

  console.log('--- Tạo TimeSlots cả tháng cho mỗi Bác sĩ (30 ngày tới) ---');
  const createdTimeSlots = [];
  const today = new Date();

  for (const doctor of doctorRecords) {
    for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
      const slotDate = new Date(today);
      slotDate.setDate(today.getDate() + dayOffset);

      const dayOfWeekEnum = DAYS_OF_WEEK[slotDate.getDay()];

      // Tạo 3 ca khám trong 1 ngày (Sáng, Chiều, Tối)
      const shifts = [
        { startHour: 8, endHour: 11 },  // Ca sáng
        { startHour: 13, endHour: 16 }, // Ca chiều
        { startHour: 17, endHour: 20 }, // Ca tối
      ];

      for (const shift of shifts) {
        const startTime = new Date(slotDate);
        startTime.setHours(shift.startHour, 0, 0, 0);

        const endTime = new Date(slotDate);
        endTime.setHours(shift.endHour, 0, 0, 0);

        const timeSlot = await prisma.timeSlot.create({
          data: {
            doctorId: doctor.id,
            dayOfWeek: dayOfWeekEnum,
            date: slotDate,
            startTime: startTime,
            endTime: endTime,
            isBlocked: false,
          },
        });
        createdTimeSlots.push(timeSlot);
      }
    }
  }

  console.log('--- Tạo 20 Lịch hẹn đã xong (Done) ---');
  for (let i = 0; i < 20; i++) {
    const patient = patientUsers[i];
    const doctor = doctorRecords[i % doctorRecords.length];
    const timeSlot = createdTimeSlots[i]; // Lấy các khung giờ đầu tiên

    await prisma.appointment.create({
      data: {
        userId: patient.id,
        doctorId: doctor.id,
        timeSlotId: timeSlot.id,
        date: timeSlot.date,
        timeType: i % 3 === 0 ? TimeType.morning : i % 3 === 1 ? TimeType.afternoon : TimeType.evening,
        status: StatusAppointment.Done,
        description: 'Tái khám định kỳ, sức khỏe ổn định.',
      },
    });
  }

  console.log('--- Tạo 20 Lịch hẹn mới (Pending) ---');
  for (let i = 20; i < 40; i++) {
    const patient = patientUsers[i]; // Lấy 20 bệnh nhân tiếp theo
    const doctor = doctorRecords[i % doctorRecords.length];
    const timeSlot = createdTimeSlots[i + 50]; // Lấy khung giờ chưa bị trùng

    await prisma.appointment.create({
      data: {
        userId: patient.id,
        doctorId: doctor.id,
        timeSlotId: timeSlot.id,
        date: timeSlot.date,
        timeType: i % 3 === 0 ? TimeType.morning : i % 3 === 1 ? TimeType.afternoon : TimeType.evening,
        status: StatusAppointment.Pending,
        description: 'Đăng ký khám bệnh lý mới, đau họng nhẹ.',
      },
    });
  }

  console.log('--- Hoàn tất Seeding thành công! ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });