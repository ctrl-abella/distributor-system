/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product"
RENAME COLUMN "description"
TO "shortDescription";

ALTER TABLE "Product"
ADD COLUMN "fullDescription" TEXT;

ALTER TABLE "Product"
ADD COLUMN "keyBenefits" JSONB;
