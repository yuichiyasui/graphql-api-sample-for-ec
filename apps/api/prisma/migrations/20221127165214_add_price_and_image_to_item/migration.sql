-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "mainImageUrl" VARCHAR(255) NOT NULL DEFAULT 'https://placehold.jp/150x150.png',
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 100;
