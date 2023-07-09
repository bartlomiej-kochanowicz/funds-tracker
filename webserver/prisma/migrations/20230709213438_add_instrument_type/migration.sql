/*
  Warnings:

  - The values [deposits] on the enum `InstrumentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InstrumentType_new" AS ENUM ('stocks', 'bonds', 'governmentBonds', 'etfs', 'options', 'commodies', 'crypto', 'immovables', 'movables', 'other');
ALTER TABLE "Instrument" ALTER COLUMN "type" TYPE "InstrumentType_new" USING ("type"::text::"InstrumentType_new");
ALTER TYPE "InstrumentType" RENAME TO "InstrumentType_old";
ALTER TYPE "InstrumentType_new" RENAME TO "InstrumentType";
DROP TYPE "InstrumentType_old";
COMMIT;
