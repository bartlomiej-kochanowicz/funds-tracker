/*
  Warnings:

  - A unique constraint covering the columns `[userUuid,uuid]` on the table `CashAccounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[portfolioUuid,uuid]` on the table `Instruments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userUuid,uuid]` on the table `Portfolios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CashAccounts_userUuid_uuid_key" ON "CashAccounts"("userUuid", "uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Instruments_portfolioUuid_uuid_key" ON "Instruments"("portfolioUuid", "uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolios_userUuid_uuid_key" ON "Portfolios"("userUuid", "uuid");
