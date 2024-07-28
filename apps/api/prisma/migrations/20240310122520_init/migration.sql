-- CreateEnum
CREATE TYPE "Subscription" AS ENUM ('FREE', 'LITE', 'EXPERT');

-- CreateEnum
CREATE TYPE "CashAccountOperationType" AS ENUM ('deposit', 'withdrawal', 'transfer', 'interest', 'tax', 'fee', 'other');

-- CreateEnum
CREATE TYPE "InstrumentType" AS ENUM ('stocks', 'bonds', 'governmentBonds', 'etfs', 'options', 'commodities', 'crypto', 'immovables', 'movables', 'others');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'JPY', 'GBP', 'CNY', 'AUD', 'CAD', 'CHF', 'HKD', 'SGD', 'SEK', 'KRW', 'NOK', 'NZD', 'INR', 'MXN', 'TWD', 'ZAR', 'BRL', 'DKK', 'PLN', 'THB', 'ILS', 'IDR', 'CZK', 'AED', 'TRY', 'HUF', 'CLP', 'SAR', 'PHP', 'MYR', 'COP', 'RUB', 'RON', 'PEN', 'BHD', 'BGN', 'ARS');

-- CreateEnum
CREATE TYPE "IntroductionStep" AS ENUM ('DefaultCurrency', 'CashAccounts', 'Portfolios', 'Completed');

-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('deposit', 'withdrawal', 'transfer', 'buy', 'sell', 'dividend', 'interest', 'tax', 'fee', 'other');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirmationCodeHash" TEXT,
    "defaultCurrency" "Currency" NOT NULL DEFAULT 'USD',
    "introductionStep" "IntroductionStep" NOT NULL DEFAULT 'DefaultCurrency',
    "subscription" "Subscription" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Session" (
    "name" TEXT NOT NULL,
    "rtHash" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUuid" TEXT NOT NULL
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
CREATE TABLE "CashAccountOperation" (
    "uuid" TEXT NOT NULL,
    "cashAccountUuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "CashAccountOperationType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "portfolioUuid" TEXT,

    CONSTRAINT "CashAccountOperation_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "uuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "OperationType" NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "portfolioUuid" TEXT NOT NULL,
    "instrumentUuid" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Instrument" (
    "uuid" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "InstrumentType" NOT NULL,
    "currency" "Currency" NOT NULL,

    CONSTRAINT "Instrument_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_confirmationCodeHash_key" ON "User"("confirmationCodeHash");

-- CreateIndex
CREATE UNIQUE INDEX "Session_rtHash_key" ON "Session"("rtHash");

-- CreateIndex
CREATE UNIQUE INDEX "CashAccount_userUuid_uuid_key" ON "CashAccount"("userUuid", "uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_userUuid_uuid_key" ON "Portfolio"("userUuid", "uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_codeExchange_key" ON "Instrument"("symbol");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashAccount" ADD CONSTRAINT "CashAccount_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashAccountOperation" ADD CONSTRAINT "CashAccountOperation_cashAccountUuid_fkey" FOREIGN KEY ("cashAccountUuid") REFERENCES "CashAccount"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashAccountOperation" ADD CONSTRAINT "CashAccountOperation_portfolioUuid_fkey" FOREIGN KEY ("portfolioUuid") REFERENCES "Portfolio"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_portfolioUuid_fkey" FOREIGN KEY ("portfolioUuid") REFERENCES "Portfolio"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_instrumentUuid_fkey" FOREIGN KEY ("instrumentUuid") REFERENCES "Instrument"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
