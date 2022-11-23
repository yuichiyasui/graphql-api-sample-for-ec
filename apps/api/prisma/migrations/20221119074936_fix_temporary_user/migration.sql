/*
  Warnings:

  - The primary key for the `TemporaryUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `verificationToken` on the `TemporaryUser` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TemporaryUser_verificationToken_key";

-- AlterTable
ALTER TABLE "TemporaryUser" DROP CONSTRAINT "TemporaryUser_pkey",
DROP COLUMN "verificationToken",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "TemporaryUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TemporaryUser_id_seq";
