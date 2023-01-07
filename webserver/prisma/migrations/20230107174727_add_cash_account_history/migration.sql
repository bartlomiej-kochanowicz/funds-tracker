-- AlterTable
ALTER TABLE "CashAccount" ADD COLUMN     "history" JSONB NOT NULL DEFAULT '[]';
