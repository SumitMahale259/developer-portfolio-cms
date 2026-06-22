-- AlterTable
ALTER TABLE "User" ADD COLUMN     "forgotPasswordAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "forgotPasswordFirstAttempt" TIMESTAMP(3),
ADD COLUMN     "resetExpiry" TIMESTAMP(3),
ADD COLUMN     "resetToken" TEXT;
