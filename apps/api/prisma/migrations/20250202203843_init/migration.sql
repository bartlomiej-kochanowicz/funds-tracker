-- CreateEnum
CREATE TYPE "Subscription" AS ENUM ('FREE', 'LITE', 'EXPERT');

-- CreateEnum
CREATE TYPE "SecurityActivityType" AS ENUM ('purchase', 'sale');

-- CreateEnum
CREATE TYPE "CashHoldingActivityType" AS ENUM ('deposit', 'payout', 'interest');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirmationCodeHash" TEXT,
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
CREATE TABLE "Wallet" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Security" (
    "uuid" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "stockExchange" TEXT,
    "exchangeShortName" TEXT,
    "name" TEXT NOT NULL,
    "currency" TEXT,
    "walletUuid" TEXT NOT NULL,

    CONSTRAINT "Security_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SecurityActivity" (
    "uuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "activityType" "SecurityActivityType" NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" INTEGER NOT NULL,
    "fee" INTEGER NOT NULL,
    "securityUuid" TEXT,

    CONSTRAINT "SecurityActivity_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CashHolding" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "walletUuid" TEXT NOT NULL,

    CONSTRAINT "CashHolding_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CashHoldingActivity" (
    "uuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "activityType" "CashHoldingActivityType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "fee" INTEGER NOT NULL,
    "cashHoldingUuid" TEXT NOT NULL,

    CONSTRAINT "CashHoldingActivity_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "HardAsset" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "walletUuid" TEXT NOT NULL,

    CONSTRAINT "HardAsset_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "HardAssetActivity" (
    "uuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "fee" INTEGER NOT NULL,
    "hardAssetUuid" TEXT NOT NULL,

    CONSTRAINT "HardAssetActivity_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_confirmationCodeHash_key" ON "User"("confirmationCodeHash");

-- CreateIndex
CREATE UNIQUE INDEX "Session_rtHash_key" ON "Session"("rtHash");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userUuid_uuid_key" ON "Wallet"("userUuid", "uuid");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "Wallet"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityActivity" ADD CONSTRAINT "SecurityActivity_securityUuid_fkey" FOREIGN KEY ("securityUuid") REFERENCES "Security"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashHolding" ADD CONSTRAINT "CashHolding_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "Wallet"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashHoldingActivity" ADD CONSTRAINT "CashHoldingActivity_cashHoldingUuid_fkey" FOREIGN KEY ("cashHoldingUuid") REFERENCES "CashHolding"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HardAsset" ADD CONSTRAINT "HardAsset_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "Wallet"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HardAssetActivity" ADD CONSTRAINT "HardAssetActivity_hardAssetUuid_fkey" FOREIGN KEY ("hardAssetUuid") REFERENCES "HardAsset"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
