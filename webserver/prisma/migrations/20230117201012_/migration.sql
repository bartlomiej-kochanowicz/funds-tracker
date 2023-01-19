-- CreateEnum
CREATE TYPE "IntroductionStep" AS ENUM ('DefaultCurrency', 'CashAccounts', 'Portfolios', 'Completed');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "introductionStep" "IntroductionStep" NOT NULL DEFAULT 'DefaultCurrency';
