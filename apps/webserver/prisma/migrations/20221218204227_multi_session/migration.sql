/*
  Warnings:

  - You are about to drop the column `rtHash` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "rtHash";

-- CreateTable
CREATE TABLE "Session" (
    "name" TEXT NOT NULL,
    "rtHash" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUuid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_rtHash_key" ON "Session"("rtHash");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
