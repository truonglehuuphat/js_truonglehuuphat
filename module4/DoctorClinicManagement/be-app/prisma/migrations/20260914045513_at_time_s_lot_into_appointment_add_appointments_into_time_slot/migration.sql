/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `doctor_id` on table `History` required. This step will fail if there are existing NULL values in that column.
  - Made the column `patient_id` on table `History` required. This step will fail if there are existing NULL values in that column.
  - Made the column `doctor_id` on table `bill` required. This step will fail if there are existing NULL values in that column.
  - Made the column `patient_id` on table `bill` required. This step will fail if there are existing NULL values in that column.
  - Made the column `history_id` on table `bill` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `doctor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department_id` on table `doctor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department_id` on table `medical` required. This step will fail if there are existing NULL values in that column.
  - Made the column `doctor_id` on table `time_slots` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_user_Id_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "bill" DROP CONSTRAINT "bill_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "bill" DROP CONSTRAINT "bill_history_id_fkey";

-- DropForeignKey
ALTER TABLE "bill" DROP CONSTRAINT "bill_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "doctor" DROP CONSTRAINT "doctor_department_id_fkey";

-- DropForeignKey
ALTER TABLE "doctor" DROP CONSTRAINT "doctor_user_id_fkey";

-- DropForeignKey
ALTER TABLE "medical" DROP CONSTRAINT "medical_department_id_fkey";

-- AlterTable
ALTER TABLE "History" ALTER COLUMN "doctor_id" SET NOT NULL,
ALTER COLUMN "patient_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "bill" ALTER COLUMN "doctor_id" SET NOT NULL,
ALTER COLUMN "patient_id" SET NOT NULL,
ALTER COLUMN "history_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "doctor" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "department_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "medical" ALTER COLUMN "department_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "time_slots" ALTER COLUMN "doctor_id" SET NOT NULL;

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "gender" "Gender" NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "datebirth" TIMESTAMP(3) NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" DEFAULT 'patient',
    "refresh_token" TEXT,
    "address" VARCHAR(200) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment" (
    "id" SERIAL NOT NULL,
    "user_Id" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "time_slot_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Time_Type" "TimeType" NOT NULL,
    "status" "StatusAppointment" NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "department_name_key" ON "department"("name");

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_time_slot_id_fkey" FOREIGN KEY ("time_slot_id") REFERENCES "time_slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical" ADD CONSTRAINT "medical_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill" ADD CONSTRAINT "bill_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill" ADD CONSTRAINT "bill_history_id_fkey" FOREIGN KEY ("history_id") REFERENCES "History"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill" ADD CONSTRAINT "bill_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
