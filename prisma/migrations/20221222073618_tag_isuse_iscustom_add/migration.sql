/*
  Warnings:

  - Added the required column `isCustom` to the `FacilityTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isUse` to the `FacilityTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCustom` to the `GroupTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isUse` to the `GroupTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCustom` to the `TutorGroupTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isUse` to the `TutorGroupTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCustom` to the `TutorTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isUse` to the `TutorTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FacilityTag" ADD COLUMN     "isCustom" BOOLEAN NOT NULL,
ADD COLUMN     "isUse" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "GroupTag" ADD COLUMN     "isCustom" BOOLEAN NOT NULL,
ADD COLUMN     "isUse" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "TutorGroupTag" ADD COLUMN     "isCustom" BOOLEAN NOT NULL,
ADD COLUMN     "isUse" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "TutorTag" ADD COLUMN     "isCustom" BOOLEAN NOT NULL,
ADD COLUMN     "isUse" BOOLEAN NOT NULL;
