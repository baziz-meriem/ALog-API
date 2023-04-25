-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_idConsommateur_fkey";

-- AlterTable
ALTER TABLE "Commande" ALTER COLUMN "idConsommateur" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_idConsommateur_fkey" FOREIGN KEY ("idConsommateur") REFERENCES "Consommateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
