/*
  Warnings:

  - You are about to drop the column `rtHash` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "rtHash";

-- CreateTable
CREATE TABLE "RefreshToken" (
    "name" TEXT NOT NULL,
    "rtHash" TEXT NOT NULL,
    "userUuid" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_name_key" ON "RefreshToken"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_rtHash_key" ON "RefreshToken"("rtHash");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
