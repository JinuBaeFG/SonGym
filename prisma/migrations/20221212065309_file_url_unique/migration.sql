/*
  Warnings:

  - A unique constraint covering the columns `[fileUrl]` on the table `UploadFiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UploadFiles_fileUrl_key" ON "UploadFiles"("fileUrl");
