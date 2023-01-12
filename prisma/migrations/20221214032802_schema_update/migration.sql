/*
  Warnings:

  - You are about to drop the column `tutorId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the `_TutorToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `photoUrl` to the `Tutor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "_TutorToUser" DROP CONSTRAINT "_TutorToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TutorToUser" DROP CONSTRAINT "_TutorToUser_B_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "tutorId";

-- AlterTable
ALTER TABLE "Tutor" ADD COLUMN     "photoUrl" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "_TutorToUser";

-- CreateTable
CREATE TABLE "GroupPresident" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupPresident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorGroup" (
    "id" SERIAL NOT NULL,
    "groupname" TEXT NOT NULL,
    "activeArea" TEXT,
    "areaLatitude" TEXT,
    "areaLongitude" TEXT,
    "sportsEvent" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "maxMember" INTEGER NOT NULL,
    "tutorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorGroupTag" (
    "id" SERIAL NOT NULL,
    "tagname" TEXT NOT NULL,
    "tutorGroupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorGroupTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorGroupInfo" (
    "id" SERIAL NOT NULL,
    "discription" TEXT NOT NULL,
    "awardDate" TEXT,
    "tutorGroupId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorGroupInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FacilityToTutorGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TutorGroupToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupPresident_groupId_userId_key" ON "GroupPresident"("groupId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_FacilityToTutorGroup_AB_unique" ON "_FacilityToTutorGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_FacilityToTutorGroup_B_index" ON "_FacilityToTutorGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TutorGroupToUser_AB_unique" ON "_TutorGroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TutorGroupToUser_B_index" ON "_TutorGroupToUser"("B");

-- AddForeignKey
ALTER TABLE "GroupPresident" ADD CONSTRAINT "GroupPresident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPresident" ADD CONSTRAINT "GroupPresident_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorGroup" ADD CONSTRAINT "TutorGroup_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorGroupTag" ADD CONSTRAINT "TutorGroupTag_tutorGroupId_fkey" FOREIGN KEY ("tutorGroupId") REFERENCES "TutorGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorGroupInfo" ADD CONSTRAINT "TutorGroupInfo_tutorGroupId_fkey" FOREIGN KEY ("tutorGroupId") REFERENCES "TutorGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToTutorGroup" ADD CONSTRAINT "_FacilityToTutorGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToTutorGroup" ADD CONSTRAINT "_FacilityToTutorGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "TutorGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TutorGroupToUser" ADD CONSTRAINT "_TutorGroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "TutorGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TutorGroupToUser" ADD CONSTRAINT "_TutorGroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
