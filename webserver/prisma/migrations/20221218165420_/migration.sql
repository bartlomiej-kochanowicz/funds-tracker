/*
  Warnings:

  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_userUuid_fkey";

-- DropTable
DROP TABLE "Device";

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
