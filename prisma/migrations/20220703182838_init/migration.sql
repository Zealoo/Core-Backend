/*
  Warnings:

  - You are about to drop the column `founder_id` on the `Community` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'Super';

-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_founder_id_fkey";

-- AlterTable
ALTER TABLE "Community" DROP COLUMN "founder_id",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
