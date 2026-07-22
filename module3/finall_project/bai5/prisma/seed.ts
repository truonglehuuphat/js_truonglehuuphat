import { Connection } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
})

async function main() {

    await prisma.product.deleteMany();
    await prisma.category.deleteMay();

    const categories = await Promise.all([
        prisma.category.create({ date: { name: "Điện thoại", slug: "phone" } }),
        prisma.category.create({ date: { name: "Laptop", slug: "Laptop" } }),
        prisma.category.create({ date: { name: "Máy tính bảng", slug: "tablet" } }),
        prisma.category.create({ date: { name: "Âm thanh", slug: "audio" } }),
        prisma.category.create({ date: { name: "Phụ kiện", slug: "accessory" } }),
    ])

    await prisma.product.createMany({
        data: [
            { title: "iphone 15 Pro", price: 22990000, thumbnail: "...", brand: "Apple", stock: 10, categoryId: categories[0].id },
            { title: "Samsung Galaxy S24 Utral", price: 25290000, thumbnail: "...", brand: "Samsung", stock: 9, categoryId: categories[0].id },
        ],
        skipDuplicates: true, //tránh lỗi nếu chạy seed nhiều lần
    })
}