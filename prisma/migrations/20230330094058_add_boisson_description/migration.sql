/*
  Warnings:

  - You are about to drop the column `codeDeverouillage` on the `AM` table. All the data in the column will be lost.
  - You are about to drop the `ClientSupplement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Boisson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disponible` to the `BoissonDistributeur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codeDeverouillage` to the `Distributeur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idAM` to the `Tache` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClientSupplement" DROP CONSTRAINT "ClientSupplement_idClient_fkey";

-- DropForeignKey
ALTER TABLE "ClientSupplement" DROP CONSTRAINT "ClientSupplement_idSupplement_fkey";

-- DropIndex
DROP INDEX "AM_codeDeverouillage_key";

-- AlterTable
ALTER TABLE "AM" DROP COLUMN "codeDeverouillage";

-- AlterTable
ALTER TABLE "Boisson" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BoissonDistributeur" ADD COLUMN     "disponible" BOOLEAN NOT NULL,
ADD COLUMN     "prix" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Distributeur" ADD COLUMN     "codeDeverouillage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tache" ADD COLUMN     "idAM" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ClientSupplement";

-- AddForeignKey
ALTER TABLE "Tache" ADD CONSTRAINT "Tache_idAM_fkey" FOREIGN KEY ("idAM") REFERENCES "AM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
