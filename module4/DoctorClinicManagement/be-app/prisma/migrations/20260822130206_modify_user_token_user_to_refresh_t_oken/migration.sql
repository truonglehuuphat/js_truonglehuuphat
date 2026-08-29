/*
  Warnings:

  - You are about to drop the column `tokenUser` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "tokenUser",
ADD COLUMN     "refresh_token" TEXT;
