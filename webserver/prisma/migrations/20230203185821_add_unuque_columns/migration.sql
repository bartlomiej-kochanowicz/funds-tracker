/*
  Warnings:

  - A unique constraint covering the columns `[uuid,email,confirmationCodeHash,resetPasswordToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_email_confirmationCodeHash_resetPasswordToken_key" ON "User"("uuid", "email", "confirmationCodeHash", "resetPasswordToken");
