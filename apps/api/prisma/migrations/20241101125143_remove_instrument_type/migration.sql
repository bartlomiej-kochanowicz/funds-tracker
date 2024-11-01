/*
  Warnings:

  - You are about to drop the column `type` on the `Instrument` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Instrument" DROP COLUMN "type";

-- DropEnum
DROP TYPE "InstrumentType";
