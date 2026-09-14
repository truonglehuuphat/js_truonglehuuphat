-- AlterTable
ALTER TABLE "appointment" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';
