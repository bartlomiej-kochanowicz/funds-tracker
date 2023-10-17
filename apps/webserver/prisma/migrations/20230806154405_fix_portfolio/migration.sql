/*
  Warnings:

  - A unique constraint covering the columns `[userUuid,uuid]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_userUuid_uuid_key" ON "Portfolio"("userUuid", "uuid");
