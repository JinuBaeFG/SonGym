/*
  Warnings:

  - A unique constraint covering the columns `[userId,groupId]` on the table `GroupJoin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupJoin_userId_groupId_key" ON "GroupJoin"("userId", "groupId");
