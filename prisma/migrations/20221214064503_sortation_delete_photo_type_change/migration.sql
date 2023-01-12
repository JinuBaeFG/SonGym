/*
  Warnings:

  - You are about to drop the column `sortation` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Facility" ALTER COLUMN "photoUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "photoUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "sortation";

-- AlterTable
ALTER TABLE "Tutor" ALTER COLUMN "photoUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TutorGroup" ALTER COLUMN "photoUrl" DROP NOT NULL;
