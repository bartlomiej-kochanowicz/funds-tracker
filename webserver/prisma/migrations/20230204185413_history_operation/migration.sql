/*
  Warnings:

  - You are about to drop the `CashAccountHistory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[confirmationCodeHash]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resetPasswordToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CashAccountOperationType" AS ENUM ('deposit', 'withdrawal', 'transfer');

-- DropForeignKey
ALTER TABLE "CashAccountHistory" DROP CONSTRAINT "CashAccountHistory_cashAccountUuid_fkey";

-- DropIndex
DROP INDEX "User_uuid_email_confirmationCodeHash_resetPasswordToken_key";

-- DropTable
DROP TABLE "CashAccountHistory";

-- CreateTable
CREATE TABLE "CashAccountOperation" (
    "uuid" TEXT NOT NULL,
    "cashAccountUuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "CashAccountOperationType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CashAccountOperation_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_confirmationCodeHash_key" ON "User"("confirmationCodeHash");

-- CreateIndex
CREATE UNIQUE INDEX "User_resetPasswordToken_key" ON "User"("resetPasswordToken");

-- AddForeignKey
ALTER TABLE "CashAccountOperation" ADD CONSTRAINT "CashAccountOperation_cashAccountUuid_fkey" FOREIGN KEY ("cashAccountUuid") REFERENCES "CashAccount"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
