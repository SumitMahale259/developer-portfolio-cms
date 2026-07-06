/*
  Warnings:

  - You are about to drop the column `resumeUrl` on the `About` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "resumeUrl";

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "resumeUrl" TEXT NOT NULL,
    "resumeCloudinaryPublicId" TEXT NOT NULL,
    "resumeName" TEXT NOT NULL,
    "aboutId" TEXT NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resume_aboutId_key" ON "Resume"("aboutId");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About"("id") ON DELETE CASCADE ON UPDATE CASCADE;
