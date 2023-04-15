-- DropForeignKey
ALTER TABLE "BoissonClient" DROP CONSTRAINT "BoissonClient_idBoisson_fkey";

-- DropForeignKey
ALTER TABLE "BoissonClient" DROP CONSTRAINT "BoissonClient_idClient_fkey";

-- DropForeignKey
ALTER TABLE "BoissonDistributeur" DROP CONSTRAINT "BoissonDistributeur_idBoisson_fkey";

-- DropForeignKey
ALTER TABLE "BoissonDistributeur" DROP CONSTRAINT "BoissonDistributeur_idDistributeur_fkey";

-- DropForeignKey
ALTER TABLE "BoissonProduit" DROP CONSTRAINT "BoissonProduit_idBoisson_fkey";

-- DropForeignKey
ALTER TABLE "BoissonProduit" DROP CONSTRAINT "BoissonProduit_idProduit_fkey";

-- DropForeignKey
ALTER TABLE "BoissonSupplement" DROP CONSTRAINT "BoissonSupplement_idBoisson_fkey";

-- DropForeignKey
ALTER TABLE "BoissonSupplement" DROP CONSTRAINT "BoissonSupplement_idSupplement_fkey";

-- AddForeignKey
ALTER TABLE "BoissonDistributeur" ADD CONSTRAINT "BoissonDistributeur_idBoisson_fkey" FOREIGN KEY ("idBoisson") REFERENCES "Boisson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonDistributeur" ADD CONSTRAINT "BoissonDistributeur_idDistributeur_fkey" FOREIGN KEY ("idDistributeur") REFERENCES "Distributeur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonProduit" ADD CONSTRAINT "BoissonProduit_idBoisson_fkey" FOREIGN KEY ("idBoisson") REFERENCES "Boisson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonProduit" ADD CONSTRAINT "BoissonProduit_idProduit_fkey" FOREIGN KEY ("idProduit") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonSupplement" ADD CONSTRAINT "BoissonSupplement_idBoisson_fkey" FOREIGN KEY ("idBoisson") REFERENCES "Boisson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonSupplement" ADD CONSTRAINT "BoissonSupplement_idSupplement_fkey" FOREIGN KEY ("idSupplement") REFERENCES "Supplement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonClient" ADD CONSTRAINT "BoissonClient_idBoisson_fkey" FOREIGN KEY ("idBoisson") REFERENCES "Boisson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonClient" ADD CONSTRAINT "BoissonClient_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
