-- AlterTable
ALTER TABLE "CashAccountOperation" ADD COLUMN     "destinationUuid" TEXT;

-- AddForeignKey
ALTER TABLE "CashAccountOperation" ADD CONSTRAINT "CashAccountOperation_destinationUuid_fkey" FOREIGN KEY ("destinationUuid") REFERENCES "Portfolio"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
