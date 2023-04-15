/*
  Warnings:

  - Added the required column `status` to the `Reclamation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consommateur" ADD COLUMN     "resetPasswordCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "resetPasswordExpire" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Reclamation" ADD COLUMN     "status" TEXT NOT NULL;
