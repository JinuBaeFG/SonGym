/*
  Warnings:

  - You are about to drop the column `tutorId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tutorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tutorId";

-- CreateTable
CREATE TABLE "_TutorToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TutorToUser_AB_unique" ON "_TutorToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TutorToUser_B_index" ON "_TutorToUser"("B");

-- AddForeignKey
ALTER TABLE "_TutorToUser" ADD CONSTRAINT "_TutorToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TutorToUser" ADD CONSTRAINT "_TutorToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
