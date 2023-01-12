/*
  Warnings:

  - You are about to drop the column `discription` on the `Facility` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Tutor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Facility" DROP COLUMN "discription";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "discription";

-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "discription";
