-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Currency" ADD VALUE 'JPY';
ALTER TYPE "Currency" ADD VALUE 'CNY';
ALTER TYPE "Currency" ADD VALUE 'AUD';
ALTER TYPE "Currency" ADD VALUE 'CAD';
ALTER TYPE "Currency" ADD VALUE 'HKD';
ALTER TYPE "Currency" ADD VALUE 'SGD';
ALTER TYPE "Currency" ADD VALUE 'SEK';
ALTER TYPE "Currency" ADD VALUE 'KRW';
ALTER TYPE "Currency" ADD VALUE 'NOK';
ALTER TYPE "Currency" ADD VALUE 'NZD';
ALTER TYPE "Currency" ADD VALUE 'INR';
ALTER TYPE "Currency" ADD VALUE 'MXN';
ALTER TYPE "Currency" ADD VALUE 'TWD';
ALTER TYPE "Currency" ADD VALUE 'ZAR';
ALTER TYPE "Currency" ADD VALUE 'BRL';
ALTER TYPE "Currency" ADD VALUE 'DKK';
ALTER TYPE "Currency" ADD VALUE 'THB';
ALTER TYPE "Currency" ADD VALUE 'ILS';
ALTER TYPE "Currency" ADD VALUE 'IDR';
ALTER TYPE "Currency" ADD VALUE 'CZK';
ALTER TYPE "Currency" ADD VALUE 'AED';
ALTER TYPE "Currency" ADD VALUE 'TRY';
ALTER TYPE "Currency" ADD VALUE 'HUF';
ALTER TYPE "Currency" ADD VALUE 'CLP';
ALTER TYPE "Currency" ADD VALUE 'SAR';
ALTER TYPE "Currency" ADD VALUE 'PHP';
ALTER TYPE "Currency" ADD VALUE 'MYR';
ALTER TYPE "Currency" ADD VALUE 'COP';
ALTER TYPE "Currency" ADD VALUE 'RUB';
ALTER TYPE "Currency" ADD VALUE 'RON';
ALTER TYPE "Currency" ADD VALUE 'PEN';
ALTER TYPE "Currency" ADD VALUE 'BHD';
ALTER TYPE "Currency" ADD VALUE 'BGN';
ALTER TYPE "Currency" ADD VALUE 'ARS';
