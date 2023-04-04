/*
  Warnings:

  - Added the required column `resetPasswordCode` to the `AC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordExpire` to the `AC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordCode` to the `ADM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordExpire` to the `ADM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordCode` to the `AM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordExpire` to the `AM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordCode` to the `Decideur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordExpire` to the `Decideur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordCode` to the `SADM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordExpire` to the `SADM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AC" ADD COLUMN     "resetPasswordCode" TEXT NOT NULL,
ADD COLUMN     "resetPasswordExpire" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ADM" ADD COLUMN     "resetPasswordCode" TEXT NOT NULL,
ADD COLUMN     "resetPasswordExpire" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "AM" ADD COLUMN     "resetPasswordCode" TEXT NOT NULL,
ADD COLUMN     "resetPasswordExpire" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Decideur" ADD COLUMN     "resetPasswordCode" TEXT NOT NULL,
ADD COLUMN     "resetPasswordExpire" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SADM" ADD COLUMN     "resetPasswordCode" TEXT NOT NULL,
ADD COLUMN     "resetPasswordExpire" TIMESTAMP(3) NOT NULL;
