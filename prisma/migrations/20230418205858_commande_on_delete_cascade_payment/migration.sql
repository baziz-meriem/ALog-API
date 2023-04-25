-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_idCommande_fkey";

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_idCommande_fkey" FOREIGN KEY ("idCommande") REFERENCES "Commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;
