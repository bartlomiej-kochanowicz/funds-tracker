/*
  Warnings:

  - The primary key for the `Instrument` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `percentageOfPortfolio` on the `Instrument` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Instrument` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code_exchange,code,ISIN]` on the table `Instrument` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code_exchange` to the `Instrument` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PortfolioOperation" DROP CONSTRAINT "PortfolioOperation_instrumentUuid_fkey";

-- DropIndex
DROP INDEX "Instrument_uuid_code_ISIN_key";

-- AlterTable
ALTER TABLE "Instrument" DROP CONSTRAINT "Instrument_pkey",
DROP COLUMN "percentageOfPortfolio",
DROP COLUMN "uuid",
ADD COLUMN     "code_exchange" TEXT NOT NULL,
ADD CONSTRAINT "Instrument_pkey" PRIMARY KEY ("code_exchange");

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_code_exchange_code_ISIN_key" ON "Instrument"("code_exchange", "code", "ISIN");

-- AddForeignKey
ALTER TABLE "PortfolioOperation" ADD CONSTRAINT "PortfolioOperation_instrumentUuid_fkey" FOREIGN KEY ("instrumentUuid") REFERENCES "Instrument"("code_exchange") ON DELETE RESTRICT ON UPDATE CASCADE;
