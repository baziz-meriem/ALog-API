-- AlterTable
ALTER TABLE "Consommateur" ADD COLUMN     "resetPasswordCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "resetPasswordExpire" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
