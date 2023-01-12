/*
  Warnings:

  - You are about to drop the column `sortation` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Facility` table. All the data in the column will be lost.
  - You are about to drop the column `sortation` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `sortation` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `sortation` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "sortation";

-- AlterTable
ALTER TABLE "Facility" DROP COLUMN "userId",
ADD COLUMN     "facilityCall" TEXT;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "sortation";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "sortation";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sortation";

-- CreateTable
CREATE TABLE "TutorPrice" (
    "id" SERIAL NOT NULL,
    "pricename" TEXT NOT NULL,
    "sportsevent" TEXT NOT NULL,
    "rotation" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "tutoringTime" TEXT NOT NULL,
    "tutorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorPrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TutorPrice" ADD CONSTRAINT "TutorPrice_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
