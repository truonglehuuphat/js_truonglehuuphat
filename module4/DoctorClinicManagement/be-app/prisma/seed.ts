import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../src/generated/prisma/client";
import { Gender, StatusDoctor, TimeType, StatusAppointment } from "../src/generated/prisma/enums";
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
  await prisma.patient.deleteMany();
  await prisma.department.deleteMany();

  console.log('Bắt đầu seed dữ liệu mới...');

  // 1. TẠO PHÒNG BAN (DEPARTMENTS)
  const departmentsData = ['Khoa Nội', 'Khoa Ngoại', 'Da Liễu', 'Tiêu Hóa', 'Xét Nghiệm'];
  const departments = await Promise.all(
    departmentsData.map(name => prisma.department.create({ data: { name } }))
  );

  // 2. TẠO 20 THUỐC & DỊCH VỤ (MEDICALS)
  const medicalsData = [
    // Đau đầu, cảm sốt, sổ mũi
    { name: 'Paracetamol 500mg', price: 20000, isService: false, desc: 'Giảm đau, hạ sốt', depId: departments[0].id },
    { name: 'Panadol Extra', price: 25000, isService: false, desc: 'Trị đau đầu mạnh', depId: departments[0].id },
    { name: 'Ibuprofen 400mg', price: 30000, isService: false, desc: 'Kháng viêm, giảm đau', depId: departments[0].id },
    { name: 'Decolgen', price: 15000, isService: false, desc: 'Trị cảm cúm, sổ mũi', depId: departments[0].id },
    { name: 'Tiffy', price: 18000, isService: false, desc: 'Trị cảm sốt, ngạt mũi', depId: departments[0].id },
    { name: 'Loratadine 10mg', price: 22000, isService: false, desc: 'Trị dị ứng, sổ mũi', depId: departments[0].id },
    // Đau bao tử
    { name: 'Omeprazole 20mg', price: 45000, isService: false, desc: 'Đặc trị loét dạ dày', depId: departments[3].id },
    { name: 'Phosphalugel (Chữ P)', price: 60000, isService: false, desc: 'Bảo vệ niêm mạc dạ dày', depId: departments[3].id },
    { name: 'Yumangel (Chữ Y)', price: 55000, isService: false, desc: 'Trị trào ngược dạ dày', depId: departments[3].id },
    { name: 'Gaviscon', price: 70000, isService: false, desc: 'Giảm ợ nóng, khó tiêu', depId: departments[3].id },
    // Nổi mụn
    { name: 'Retinol 1% Cream', price: 250000, isService: false, desc: 'Trị mụn ẩn, chống lão hóa', depId: departments[2].id },
    { name: 'Benzoyl Peroxide 5%', price: 150000, isService: false, desc: 'Gom cồi mụn viêm', depId: departments[2].id },
    { name: 'Salicylic Acid 2% (BHA)', price: 300000, isService: false, desc: 'Tẩy da chết, trị mụn', depId: departments[2].id },
    { name: 'Clindamycin Gel', price: 120000, isService: false, desc: 'Kháng sinh bôi mụn', depId: departments[2].id },
    // Dịch vụ
    { name: 'Lấy nhân mụn chuẩn Y khoa', price: 350000, isService: true, desc: 'Làm sạch mụn', depId: departments[2].id },
    { name: 'Peel da sinh học', price: 800000, isService: true, desc: 'Tái tạo da', depId: departments[2].id },
    { name: 'Xét nghiệm máu tổng quát', price: 500000, isService: true, desc: 'Kiểm tra sinh hóa máu', depId: departments[4].id },
    { name: 'Xét nghiệm nước tiểu', price: 150000, isService: true, desc: 'Kiểm tra chức năng thận', depId: departments[4].id },
    { name: 'Nội soi dạ dày', price: 1200000, isService: true, desc: 'Nội soi không đau', depId: departments[3].id },
    { name: 'Khám tổng quát', price: 200000, isService: true, desc: 'Khám lâm sàng ban đầu', depId: departments[0].id },
  ];

  const medicals = await Promise.all(
    medicalsData.map(item =>
      prisma.medical.create({
        data: {
          name: item.name,
          price: item.price,
          quantity: item.isService ? 0 : faker.number.int({ min: 50, max: 500 }),
          isService: item.isService,
          description: item.desc,
          departmentId: item.depId,
        },
      })
    )
  );

  // 3. TẠO 20 BÁC SĨ (KÈM "LỊCH TRỰC" THÔNG QUA CUỘC HẸN SAU NÀY)
  const doctors = [];
  for (let i = 0; i < 20; i++) {
    const doc = await prisma.doctor.create({
      data: {
        fullname: `BS. ${faker.person.fullName()}`,
        gender: faker.helpers.arrayElement([Gender.male, Gender.female]),
        datebirth: faker.date.birthdate({ min: 28, max: 60, mode: 'age' }),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number().substring(0, 15),
        password: 'password123',
        departmentId: faker.helpers.arrayElement(departments).id,
      },
    });
    doctors.push(doc);
  }

  // 4. TẠO 100 BỆNH NHÂN
  const patients = [];
  for (let i = 0; i < 100; i++) {
    const pat = await prisma.patient.create({
      data: {
        name: faker.person.fullName(),
        gender: faker.helpers.arrayElement([Gender.male, Gender.female]),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number().substring(0, 15),
        password: 'password123',
        datebirth: faker.date.birthdate({ min: 5, max: 80, mode: 'age' }),
      },
    });
    patients.push(pat);
  }

  // 5. TẠO 180 CUỘC HẸN VÀ CÁC THỰC THỂ LIÊN QUAN (HISTORY, BILL, BILL ITEMS)
  const timeTypes = [TimeType.morning, TimeType.afternoon, TimeType.evening];

  // Helper function để lấy random items cho Bill
  const getRandomMedicals = (count: number) => faker.helpers.arrayElements(medicals, count);

  // 5.1. 100 Cuộc hẹn Done -> Đi kèm History và Bill
  console.log('Đang tạo 100 cuộc hẹn Done...');
  for (let i = 0; i < 100; i++) {
    const doctor = faker.helpers.arrayElement(doctors);
    const patient = faker.helpers.arrayElement(patients);
    const appointmentDate = faker.date.past({ years: 1 });

    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        date: appointmentDate,
        timeType: faker.helpers.arrayElement(timeTypes),
        status: StatusAppointment.Done,
        description: 'Bệnh nhân có triệu chứng cần khám',
      },
    });

    // Tạo History tương ứng
    const history = await prisma.history.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        date: appointmentDate,
        description: 'Đã khám xong. Bệnh nhân cần nghỉ ngơi và dùng thuốc theo đơn.',
      },
    });

    // Random 2-4 thuốc/dịch vụ cho Bill
    const selectedMedicals = getRandomMedicals(faker.number.int({ min: 2, max: 4 }));

    // Tính tổng tiền
    let totalCost = 0;
    const billItemsData = selectedMedicals.map(med => {
      const qty = med.isService ? 1 : faker.number.int({ min: 1, max: 3 });
      const cost = med.price * qty;
      totalCost += cost;
      return {
        medicianId: med.id, // Dùng đúng tên trường trong Schema của bạn
        quantity: qty,
        cost: cost,
      };
    });

    // Tạo Bill và BillItem
    await prisma.bill.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        historyId: history.id,
        totalCost: totalCost,
        createdAt: appointmentDate,
        items: {
          create: billItemsData,
        },
      },
    });
  }

  // 5.2. 10 Cuộc hẹn Cancelled
  console.log('Đang tạo 10 cuộc hẹn Cancelled...');
  for (let i = 0; i < 10; i++) {
    await prisma.appointment.create({
      data: {
        patientId: faker.helpers.arrayElement(patients).id,
        doctorId: faker.helpers.arrayElement(doctors).id,
        date: faker.date.recent({ days: 30 }),
        timeType: faker.helpers.arrayElement(timeTypes),
        status: StatusAppointment.Cancelled,
        description: 'Bệnh nhân bận việc đột xuất',
      },
    });
  }

  // 5.3. 20 Cuộc hẹn Pending
  console.log('Đang tạo 20 cuộc hẹn Pending...');
  for (let i = 0; i < 20; i++) {
    await prisma.appointment.create({
      data: {
        patientId: faker.helpers.arrayElement(patients).id,
        doctorId: faker.helpers.arrayElement(doctors).id,
        date: faker.date.soon({ days: 10 }), // Sắp diễn ra
        timeType: faker.helpers.arrayElement(timeTypes),
        status: StatusAppointment.Pending,
        description: 'Chờ bác sĩ xác nhận lịch hẹn',
      },
    });
  }

  // 5.4. 50 Cuộc hẹn Active (Chưa tới ngày)
  console.log('Đang tạo 50 cuộc hẹn Active...');
  for (let i = 0; i < 50; i++) {
    await prisma.appointment.create({
      data: {
        patientId: faker.helpers.arrayElement(patients).id,
        doctorId: faker.helpers.arrayElement(doctors).id,
        // date: faker.date.future({ years: 0.5 }), // Tương lai
        timeType: faker.helpers.arrayElement(timeTypes),
        status: StatusAppointment.Active,
        description: 'Lịch hẹn định kỳ / Tái khám',
      },
    });
  }

  // 6. TẠO 3 TÀI KHOẢN ADMIN
  console.log('Đang tạo 3 tài khoản Admin...');
  await prisma.admin.createMany({
    data: [
      {
        name: 'Quản trị viên cấp cao',
        email: 'superadmin@clinic.com',
        // Trong thực tế, bạn phải mã hóa mật khẩu bằng bcrypt (VD: bcrypt.hashSync('admin123', 10))
        // Ở đây seed data giả định mình lưu plain text hoặc chuỗi hash giả
        password: 'admin_password_123',
      },
      {
        name: 'Quản lý Hệ thống',
        email: 'manager@clinic.com',
        password: 'manager_password_123',
      },
      {
        name: 'IT Support',
        email: 'it@clinic.com',
        password: 'it_password_123',
      }
    ],
    // Dùng skipDuplicates để không bị lỗi báo trùng email nếu bạn chạy lệnh seed nhiều lần
    skipDuplicates: true,
  });
  console.log('Hoàn thành quá trình Seed Dữ Liệu!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });