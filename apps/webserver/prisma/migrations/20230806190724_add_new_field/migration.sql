/*
  Warnings:

  - The primary key for the `Instrument` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code_exchange` on the `Instrument` table. All the data in the column will be lost.
  - You are about to drop the column `instrumentUuid` on the `PortfolioOperation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codeExchange,code,ISIN]` on the table `Instrument` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codeExchange` to the `Instrument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instrumentCodeExchange` to the `PortfolioOperation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PortfolioOperation" DROP CONSTRAINT "PortfolioOperation_instrumentUuid_fkey";

-- DropIndex
DROP INDEX "Instrument_code_exchange_code_ISIN_key";

-- AlterTable
ALTER TABLE "Instrument" DROP CONSTRAINT "Instrument_pkey",
DROP COLUMN "code_exchange",
ADD COLUMN     "codeExchange" TEXT NOT NULL,
ADD CONSTRAINT "Instrument_pkey" PRIMARY KEY ("codeExchange");

-- AlterTable
ALTER TABLE "PortfolioOperation" DROP COLUMN "instrumentUuid",
ADD COLUMN     "instrumentCodeExchange" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_codeExchange_code_ISIN_key" ON "Instrument"("codeExchange", "code", "ISIN");

-- AddForeignKey
ALTER TABLE "PortfolioOperation" ADD CONSTRAINT "PortfolioOperation_instrumentCodeExchange_fkey" FOREIGN KEY ("instrumentCodeExchange") REFERENCES "Instrument"("codeExchange") ON DELETE RESTRICT ON UPDATE CASCADE;
