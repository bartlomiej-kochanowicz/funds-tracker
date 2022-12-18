/*
  Warnings:

  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userUuid_fkey";

-- DropTable
DROP TABLE "RefreshToken";

-- CreateTable
CREATE TABLE "Device" (
    "name" TEXT NOT NULL,
    "rtHash" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_rtHash_key" ON "Device"("rtHash");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
