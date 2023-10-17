-- CreateEnum
CREATE TYPE "InstrumentType" AS ENUM ('stocks', 'bonds', 'commodies', 'crypto', 'immovables', 'movables', 'deposits');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('CHF', 'EUR', 'GBP', 'USD', 'PLN');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rtHash" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CashAccount" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" "Currency" NOT NULL,
    "userUuid" TEXT NOT NULL,

    CONSTRAINT "CashAccount_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rebalancingEnabled" BOOLEAN NOT NULL DEFAULT false,
    "userUuid" TEXT NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Instrument" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "percentageOfPortfolio" INTEGER DEFAULT 0,
    "type" "InstrumentType" NOT NULL,
    "portfolioUuid" TEXT NOT NULL,

    CONSTRAINT "Instrument_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CashAccount_userUuid_uuid_key" ON "CashAccount"("userUuid", "uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_userUuid_uuid_key" ON "Portfolio"("userUuid", "uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_portfolioUuid_uuid_key" ON "Instrument"("portfolioUuid", "uuid");

-- AddForeignKey
ALTER TABLE "CashAccount" ADD CONSTRAINT "CashAccount_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_portfolioUuid_fkey" FOREIGN KEY ("portfolioUuid") REFERENCES "Portfolio"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
