/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_key" ON "Device"("name");
