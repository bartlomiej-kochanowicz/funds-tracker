/*
  Warnings:

  - You are about to drop the column `portfolioUuid` on the `Instrument` table. All the data in the column will be lost.
  - You are about to drop the `InstrumentOperation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[uuid,code,ISIN]` on the table `Instrument` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `Instrument` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Instrument" DROP CONSTRAINT "Instrument_portfolioUuid_fkey";

-- DropForeignKey
ALTER TABLE "InstrumentOperation" DROP CONSTRAINT "InstrumentOperation_instrumentUuid_fkey";

-- DropIndex
DROP INDEX "Instrument_portfolioUuid_uuid_key";

-- DropIndex
DROP INDEX "Portfolio_userUuid_uuid_key";

-- AlterTable
ALTER TABLE "Instrument" DROP COLUMN "portfolioUuid",
ADD COLUMN     "country" TEXT NOT NULL;

-- DropTable
DROP TABLE "InstrumentOperation";

-- CreateTable
CREATE TABLE "PortfolioOperation" (
    "uuid" TEXT NOT NULL,
    "instrumentUuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "OperationType" NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "portfolioUuid" TEXT NOT NULL,

    CONSTRAINT "PortfolioOperation_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_uuid_code_ISIN_key" ON "Instrument"("uuid", "code", "ISIN");

-- AddForeignKey
ALTER TABLE "PortfolioOperation" ADD CONSTRAINT "PortfolioOperation_instrumentUuid_fkey" FOREIGN KEY ("instrumentUuid") REFERENCES "Instrument"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioOperation" ADD CONSTRAINT "PortfolioOperation_portfolioUuid_fkey" FOREIGN KEY ("portfolioUuid") REFERENCES "Portfolio"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
