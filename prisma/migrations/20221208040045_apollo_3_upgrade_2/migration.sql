/*
  Warnings:

  - You are about to drop the `Files` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_photoId_fkey";

-- DropTable
DROP TABLE "Files";

-- CreateTable
CREATE TABLE "UploadFiles" (
    "id" SERIAL NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "photoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UploadFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UploadFiles" ADD CONSTRAINT "UploadFiles_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
