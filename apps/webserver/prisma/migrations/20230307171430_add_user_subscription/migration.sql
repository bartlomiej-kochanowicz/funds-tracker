-- CreateEnum
CREATE TYPE "Subscription" AS ENUM ('FREE', 'LITE', 'PROFESSIONAL', 'EXPERT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscription" "Subscription" NOT NULL DEFAULT 'FREE';
