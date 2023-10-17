/*
  Warnings:

  - The values [PROFESSIONAL] on the enum `Subscription` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `code` to the `Instrument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Instrument` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('deposit', 'withdrawal', 'transfer', 'buy', 'sell', 'dividend', 'interest', 'tax', 'fee', 'other');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CashAccountOperationType" ADD VALUE 'interest';
ALTER TYPE "CashAccountOperationType" ADD VALUE 'tax';
ALTER TYPE "CashAccountOperationType" ADD VALUE 'fee';
ALTER TYPE "CashAccountOperationType" ADD VALUE 'other';

-- AlterEnum
ALTER TYPE "InstrumentType" ADD VALUE 'other';

-- AlterEnum
BEGIN;
CREATE TYPE "Subscription_new" AS ENUM ('FREE', 'LITE', 'EXPERT');
ALTER TABLE "User" ALTER COLUMN "subscription" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "subscription" TYPE "Subscription_new" USING ("subscription"::text::"Subscription_new");
ALTER TYPE "Subscription" RENAME TO "Subscription_old";
ALTER TYPE "Subscription_new" RENAME TO "Subscription";
DROP TYPE "Subscription_old";
ALTER TABLE "User" ALTER COLUMN "subscription" SET DEFAULT 'FREE';
COMMIT;

-- AlterTable
ALTER TABLE "Instrument" ADD COLUMN     "ISIN" TEXT,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "InstrumentOperation" (
    "uuid" TEXT NOT NULL,
    "instrumentUuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "OperationType" NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InstrumentOperation_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "InstrumentOperation" ADD CONSTRAINT "InstrumentOperation_instrumentUuid_fkey" FOREIGN KEY ("instrumentUuid") REFERENCES "Instrument"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
