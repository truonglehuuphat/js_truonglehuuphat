import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'
import { LetterGrade, StudentStatus } from '../src/generated/prisma';
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

// Danh sách dữ liệu mẫu để phối hợp ngẫu nhiên
const LAST_NAMES = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Vũ', 'Đặng', 'Bùi', 'Đỗ'];
const MIDDLE_NAMES = ['Văn', 'Thị', 'Đức', 'Thành', 'Minh', 'Ngọc', 'Quang', 'Thu', 'Thảo', 'Anh'];
const FIRST_NAMES = ['An', 'Bình', 'Cường', 'Dũng', 'Giang', 'Hải', 'Hùng', 'Khanh', 'Linh', 'Nam', 'Phong', 'Quân', 'Sơn', 'Tâm', 'Trang', 'Tuấn', 'Việt', 'Vy', 'Yến', 'Khoa'];

const SUBJECTS = ['Toán', 'Văn', 'Tiếng Anh', 'Vật Lý', 'Hóa Học', 'Sinh Học'];
const TEACHERS = ['Thầy Nguyễn Văn Thành', 'Cô Trần Thị Hoa', 'Cô Lê Thu Hà', 'Thầy Phạm Minh Trí', 'Thầy Đặng Hoàng Nam', 'Cô Bùi Bích Phương'];

// Hàm random helper
function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomScore(min = 4, max = 10): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

function calculateLetterGrade(avg: number): LetterGrade {
    if (avg >= 8.5) return LetterGrade.A;
    if (avg >= 7.0) return LetterGrade.B;
    if (avg >= 5.5) return LetterGrade.C;
    if (avg >= 4.0) return LetterGrade.D;
    if (avg >= 3.0) return LetterGrade.E;
    return LetterGrade.F;
}

// Chuyển chuỗi tiếng Việt có dấu thành không dấu làm email
function removeVietnameseTones(str: string): string {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()
        .replace(/\s+/g, '');
}

async function main() {
    console.log('🚀 Đang làm sạch dữ liệu cũ...');
    await prisma.grade.deleteMany();
    await prisma.student.deleteMany();
    await prisma.class.deleteMany();

    console.log('📚 Đang tạo danh sách Lớp học...');
    const gradesList = [10, 11, 12];
    const classIndexes = [1, 2, 3, 4, 5];
    const createdClasses = [];

    for (const gradeNum of gradesList) {
        for (const idx of classIndexes) {
            const className = `${gradeNum}A${idx}`;
            const newClass = await prisma.class.create({
                data: {
                    name: className,
                    subject: getRandomItem(SUBJECTS),
                    teacherName: getRandomItem(TEACHERS),
                    maxStudents: 30,
                    schedule: 'Thứ 2 - Thứ 6 (7:30 - 11:30)',
                },
            });
            createdClasses.push(newClass);
        }
    }

    console.log(`✅ Đã tạo ${createdClasses.length} lớp học.`);
    console.log('👨‍🎓 Đang khởi tạo Học sinh và Điểm số...');
    console.log(`✅ Đã tạo ${createdClasses.length} lớp học.`);
    console.log('👨‍🎓 Đang khởi tạo Học sinh và Điểm số...');

    let studentCounter = 1;

    for (const currentClass of createdClasses) {
        for (let i = 1; i <= 20; i++) {
            const lastName = getRandomItem(LAST_NAMES);
            const middleName = getRandomItem(MIDDLE_NAMES);
            const firstName = getRandomItem(FIRST_NAMES);
            const fullname = `${lastName} ${middleName} ${firstName}`;

            // Tạo email không trùng lặp
            const rawSlug = removeVietnameseTones(`${firstName}.${lastName}${studentCounter}`);
            const email = `${rawSlug}@school.edu.vn`;
            const phone = `09${Math.floor(10000000 + Math.random() * 90000000)}`;

            // 1. Chuẩn bị bảng điểm 6 môn cho học sinh này
            let totalSubjectAvg = 0;
            const gradesData = SUBJECTS.map((subName) => {
                const midterm = getRandomScore(4, 10);
                const final = getRandomScore(4, 10);
                // Điểm trung bình môn = (Giữa kỳ + Cuối kỳ * 2) / 3
                const average = parseFloat(((midterm + final * 2) / 3).toFixed(2));
                const letterGrade = calculateLetterGrade(average);

                totalSubjectAvg += average;

                return {
                    subject: subName,
                    midterm,
                    final,
                    average,
                    letterGrade,
                };
            });

            // GPA trung bình 6 môn của học sinh (thang điểm 10)
            const studentGpa = parseFloat((totalSubjectAvg / SUBJECTS.length).toFixed(1));

            // 2. Tạo Student cùng với Bảng điểm tương ứng (Nested Create)
            await prisma.student.create({
                data: {
                    fullname, // Lưu ý: fullname chữ l viết thường theo schema
                    email,
                    phone,
                    classId: currentClass.id,
                    gpa: studentGpa,
                    status: StudentStatus.active,
                    grades: {
                        create: gradesData,
                    },
                },
            });

            studentCounter++;
        }
    }
    console.log('🎉 Seed dữ liệu thành công!');
    console.log(`📊 Tổng cộng: ${createdClasses.length} lớp, ${studentCounter - 1} học sinh và ${(studentCounter - 1) * 6} đầu điểm.`);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());