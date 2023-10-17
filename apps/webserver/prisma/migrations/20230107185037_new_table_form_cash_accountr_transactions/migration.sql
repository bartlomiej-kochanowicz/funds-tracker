/*
  Warnings:

  - You are about to drop the column `history` on the `CashAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CashAccount" DROP COLUMN "history";

-- CreateTable
CREATE TABLE "CashAccountHistory" (
    "uuid" TEXT NOT NULL,
    "cashAccountUuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CashAccountHistory_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "CashAccountHistory" ADD CONSTRAINT "CashAccountHistory_cashAccountUuid_fkey" FOREIGN KEY ("cashAccountUuid") REFERENCES "CashAccount"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
