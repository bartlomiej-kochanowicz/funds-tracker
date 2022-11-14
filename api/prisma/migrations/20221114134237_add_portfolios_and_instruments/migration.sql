/*
  Warnings:

  - Changed the type of `currency` on the `CashAccounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('CHF', 'EUR', 'GBP', 'USD', 'PLN');

-- AlterTable
ALTER TABLE "CashAccounts" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL;

-- CreateTable
CREATE TABLE "Portfolios" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,

    CONSTRAINT "Portfolios_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Instruments" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "portfolioUuid" TEXT NOT NULL,

    CONSTRAINT "Instruments_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Portfolios" ADD CONSTRAINT "Portfolios_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instruments" ADD CONSTRAINT "Instruments_portfolioUuid_fkey" FOREIGN KEY ("portfolioUuid") REFERENCES "Portfolios"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
