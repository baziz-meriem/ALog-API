-- DropForeignKey
ALTER TABLE "Reclamation" DROP CONSTRAINT "Reclamation_idPayment_fkey";

-- AddForeignKey
ALTER TABLE "Reclamation" ADD CONSTRAINT "Reclamation_idPayment_fkey" FOREIGN KEY ("idPayment") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
