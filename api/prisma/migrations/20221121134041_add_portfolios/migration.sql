/*
  Warnings:

  - Added the required column `type` to the `Instruments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InstrumentType" AS ENUM ('stocks', 'bonds', 'commodies', 'crypto', 'immovables', 'movables', 'deposits');

-- AlterTable
ALTER TABLE "Instruments" ADD COLUMN     "percentageOfPortfolio" INTEGER DEFAULT 0,
ADD COLUMN     "type" "InstrumentType" NOT NULL;

-- AlterTable
ALTER TABLE "Portfolios" ADD COLUMN     "rebalancingEnabled" BOOLEAN NOT NULL DEFAULT false;
