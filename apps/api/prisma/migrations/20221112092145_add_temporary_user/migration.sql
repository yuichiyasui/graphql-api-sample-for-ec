-- CreateTable
CREATE TABLE "TemporaryUser" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "verificationToken" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TemporaryUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemporaryUser_email_key" ON "TemporaryUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TemporaryUser_verificationToken_key" ON "TemporaryUser"("verificationToken");
