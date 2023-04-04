/*
  Warnings:

  - You are about to drop the column `dateDebut` on the `Tache` table. All the data in the column will be lost.
  - You are about to drop the column `dateTraitement` on the `Tache` table. All the data in the column will be lost.
  - Added the required column `Soustype` to the `Tache` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tache" DROP COLUMN "dateDebut",
DROP COLUMN "dateTraitement",
ADD COLUMN     "Soustype" TEXT NOT NULL,
ADD COLUMN     "dateAffectation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateDebutTraitement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateFinTraitement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "etat" SET DATA TYPE TEXT;
