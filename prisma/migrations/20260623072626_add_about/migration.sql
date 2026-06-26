/*
  Warnings:

  - You are about to drop the column `createdAt` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `About` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
