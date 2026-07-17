import { PrismaClient } from "../prisma/";

const prisma = new PrismaClient()

async function main(){
    await prisma.categories
}