import prisma from "../db/prisma.ts"
import { Prisma } from "@prisma/client"

//Transform Prisma result shape FE cần
function toShape(p: any){
    return {
        id:     p.id,
        title:  p.title,
        price:  Number(p.price),
        thumbnail:  p.thumbnail,
        category:   p.category.slug,
        description: p.description ?? "",
        brand:  p.brand,
        stock:  p.stock,
        rating: Number(p.rating),
        ratingCount: p.ratingCount,
    }
}

export async function findAll(query: {
    category?: string; search?: string; page: number; limit: number;
}) {
    const { category, search, page, limit} = query;
    const where: Prisma.ProductWhereInput={
        ...(category && {category: {slug: category}}),
        ...(search && { title: {contains: search, mode: "insensitive"}}),
    };
    const [products, total] = await prisma.$trasaction([
        prisma.product.findMany({
            where,
            include: {category: true},
            orderBy: {createdAt: "desc"},
            take: limit,
            skip: (page-1)* limit,
        }),
        prisma.product.count({where}),
    ]);
    return {data: products.map(toShape), total};
}