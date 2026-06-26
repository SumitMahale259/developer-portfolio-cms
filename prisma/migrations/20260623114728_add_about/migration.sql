/*
  Warnings:

  - You are about to drop the column `titles` on the `About` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "titles",
ADD COLUMN     "roles" TEXT[];
