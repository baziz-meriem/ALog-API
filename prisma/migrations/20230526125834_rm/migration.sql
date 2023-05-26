/*
  Warnings:

  - You are about to drop the column `idCommande` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `Commande` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Consommateur` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_idBoisson_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_idConsommateur_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_idCommande_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "idCommande";

-- DropTable
DROP TABLE "Commande";

-- DropTable
DROP TABLE "Consommateur";
