-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "numTel" INTEGER NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distributeur" (
    "id" SERIAL NOT NULL,
    "etat" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "idClient" INTEGER NOT NULL,
    "idRegion" INTEGER NOT NULL,
    "idAM" INTEGER NOT NULL,

    CONSTRAINT "Distributeur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TentativeVol" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "idDistributeur" INTEGER NOT NULL,

    CONSTRAINT "TentativeVol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Decideur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "numTel" INTEGER NOT NULL,
    "idClient" INTEGER NOT NULL,

    CONSTRAINT "Decideur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AC" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "numTel" INTEGER NOT NULL,
    "idClient" INTEGER NOT NULL,

    CONSTRAINT "AC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AM" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "numTel" DOUBLE PRECISION NOT NULL,
    "codeDeverouillage" TEXT NOT NULL,
    "idClient" INTEGER NOT NULL,

    CONSTRAINT "AM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ADM" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "numTel" INTEGER NOT NULL,
    "idClient" INTEGER NOT NULL,

    CONSTRAINT "ADM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SADM" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "numTel" INTEGER NOT NULL,

    CONSTRAINT "SADM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consommateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "numTel" INTEGER NOT NULL,

    CONSTRAINT "Consommateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boisson" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Boisson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoissonDistributeur" (
    "idBoisson" INTEGER NOT NULL,
    "idDistributeur" INTEGER NOT NULL,

    CONSTRAINT "BoissonDistributeur_pkey" PRIMARY KEY ("idBoisson","idDistributeur")
);

-- CreateTable
CREATE TABLE "BoissonProduit" (
    "idBoisson" INTEGER NOT NULL,
    "idProduit" INTEGER NOT NULL,
    "quantite" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "BoissonProduit_pkey" PRIMARY KEY ("idBoisson","idProduit")
);

-- CreateTable
CREATE TABLE "ProduitDistributeur" (
    "idProduit" INTEGER NOT NULL,
    "idDistributeur" INTEGER NOT NULL,
    "quantite" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "ProduitDistributeur_pkey" PRIMARY KEY ("idProduit","idDistributeur")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "etat" TEXT NOT NULL,
    "idConsommateur" INTEGER NOT NULL,
    "idDistributeur" INTEGER NOT NULL,
    "idBoisson" INTEGER NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "etat" TEXT NOT NULL,
    "typeCarte" TEXT NOT NULL,
    "monnaie" TEXT NOT NULL,
    "idCommande" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reclamation" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idPayment" INTEGER NOT NULL,

    CONSTRAINT "Reclamation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reponse" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idReclamation" INTEGER NOT NULL,

    CONSTRAINT "Reponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Annonceur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "idClient" INTEGER NOT NULL,

    CONSTRAINT "Annonceur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Annonce" (
    "id" SERIAL NOT NULL,
    "video" TEXT NOT NULL,
    "periodeAffichage" TEXT NOT NULL,
    "prixAnnonce" DOUBLE PRECISION NOT NULL,
    "idRegion" INTEGER NOT NULL,
    "idBoisson" INTEGER NOT NULL,
    "idAnnonceur" INTEGER NOT NULL,

    CONSTRAINT "Annonce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnonceCategorie" (
    "idAnnonce" INTEGER NOT NULL,
    "idCategorie" INTEGER NOT NULL,

    CONSTRAINT "AnnonceCategorie_pkey" PRIMARY KEY ("idAnnonce","idCategorie")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeAnomalie" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TypeAnomalie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anomalie" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idTypeAnomalie" INTEGER NOT NULL,
    "idDistributeur" INTEGER NOT NULL,

    CONSTRAINT "Anomalie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplement" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Supplement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoissonSupplement" (
    "idBoisson" INTEGER NOT NULL,
    "idSupplement" INTEGER NOT NULL,

    CONSTRAINT "BoissonSupplement_pkey" PRIMARY KEY ("idBoisson","idSupplement")
);

-- CreateTable
CREATE TABLE "ClientSupplement" (
    "idClient" INTEGER NOT NULL,
    "idSupplement" INTEGER NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ClientSupplement_pkey" PRIMARY KEY ("idClient","idSupplement")
);

-- CreateTable
CREATE TABLE "DistributeurSupplement" (
    "idClient" INTEGER NOT NULL,
    "idSupplement" INTEGER NOT NULL,

    CONSTRAINT "DistributeurSupplement_pkey" PRIMARY KEY ("idClient","idSupplement")
);

-- CreateTable
CREATE TABLE "Tache" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "etat" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "chargement" DOUBLE PRECISION NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTraitement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idDistributeur" INTEGER NOT NULL,

    CONSTRAINT "Tache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoissonClient" (
    "idBoisson" INTEGER NOT NULL,
    "idClient" INTEGER NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BoissonClient_pkey" PRIMARY KEY ("idBoisson","idClient")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Decideur_email_key" ON "Decideur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AC_email_key" ON "AC"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AM_email_key" ON "AM"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AM_codeDeverouillage_key" ON "AM"("codeDeverouillage");

-- CreateIndex
CREATE UNIQUE INDEX "ADM_email_key" ON "ADM"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SADM_email_key" ON "SADM"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Consommateur_email_key" ON "Consommateur"("email");

-- AddForeignKey
ALTER TABLE "Distributeur" ADD CONSTRAINT "Distributeur_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distributeur" ADD CONSTRAINT "Distributeur_idRegion_fkey" FOREIGN KEY ("idRegion") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distributeur" ADD CONSTRAINT "Distributeur_idAM_fkey" FOREIGN KEY ("idAM") REFERENCES "AM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TentativeVol" ADD CONSTRAINT "TentativeVol_idDistributeur_fkey" FOREIGN KEY ("idDistributeur") REFERENCES "Distributeur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Decideur" ADD CONSTRAINT "Decideur_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AC" ADD CONSTRAINT "AC_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AM" ADD CONSTRAINT "AM_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ADM" ADD CONSTRAINT "ADM_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonDistributeur" ADD CONSTRAINT "BoissonDistributeur_idBoisson_fkey" FOREIGN KEY ("idBoisson") REFERENCES "Boisson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonDistributeur" ADD CONSTRAINT "BoissonDistributeur_idDistributeur_fkey" FOREIGN KEY ("idDistributeur") REFERENCES "Distributeur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonProduit" ADD CONSTRAINT "BoissonProduit_idBoisson_fkey" FOREIGN KEY ("idBoisson") REFERENCES "Boisson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonProduit" ADD CONSTRAINT "BoissonProduit_idProduit_fkey" FOREIGN KEY ("idProduit") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProduitDistributeur" ADD CONSTRAINT "ProduitDistributeur_idProduit_fkey" FOREIGN KEY ("idProduit") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProduitDistributeur" ADD CONSTRAINT "ProduitDistributeur_idDistributeur_fkey" FOREIGN KEY ("idDistributeur") REFERENCES "Distributeur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_idConsommateur_fkey" FOREIGN KEY ("idConsommateur") REFERENCES "Consommateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_idDistributeur_fkey" FOREIGN KEY ("idDistributeur") REFERENCES "Distributeur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_idBoisson_fkey" FOREIGN KEY ("idBoisson") REFERENCES "Boisson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_idCommande_fkey" FOREIGN KEY ("idCommande") REFERENCES "Commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reclamation" ADD CONSTRAINT "Reclamation_idPayment_fkey" FOREIGN KEY ("idPayment") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reponse" ADD CONSTRAINT "Reponse_idReclamation_fkey" FOREIGN KEY ("idReclamation") REFERENCES "Reclamation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annonceur" ADD CONSTRAINT "Annonceur_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_idRegion_fkey" FOREIGN KEY ("idRegion") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_idBoisson_fkey" FOREIGN KEY ("idBoisson") REFERENCES "Boisson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_idAnnonceur_fkey" FOREIGN KEY ("idAnnonceur") REFERENCES "Annonceur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnonceCategorie" ADD CONSTRAINT "AnnonceCategorie_idAnnonce_fkey" FOREIGN KEY ("idAnnonce") REFERENCES "Annonce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnonceCategorie" ADD CONSTRAINT "AnnonceCategorie_idCategorie_fkey" FOREIGN KEY ("idCategorie") REFERENCES "Categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anomalie" ADD CONSTRAINT "Anomalie_idTypeAnomalie_fkey" FOREIGN KEY ("idTypeAnomalie") REFERENCES "TypeAnomalie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anomalie" ADD CONSTRAINT "Anomalie_idDistributeur_fkey" FOREIGN KEY ("idDistributeur") REFERENCES "Distributeur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonSupplement" ADD CONSTRAINT "BoissonSupplement_idBoisson_fkey" FOREIGN KEY ("idBoisson") REFERENCES "Boisson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonSupplement" ADD CONSTRAINT "BoissonSupplement_idSupplement_fkey" FOREIGN KEY ("idSupplement") REFERENCES "Supplement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientSupplement" ADD CONSTRAINT "ClientSupplement_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientSupplement" ADD CONSTRAINT "ClientSupplement_idSupplement_fkey" FOREIGN KEY ("idSupplement") REFERENCES "Supplement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistributeurSupplement" ADD CONSTRAINT "DistributeurSupplement_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistributeurSupplement" ADD CONSTRAINT "DistributeurSupplement_idSupplement_fkey" FOREIGN KEY ("idSupplement") REFERENCES "Supplement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tache" ADD CONSTRAINT "Tache_idDistributeur_fkey" FOREIGN KEY ("idDistributeur") REFERENCES "Distributeur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonClient" ADD CONSTRAINT "BoissonClient_idBoisson_fkey" FOREIGN KEY ("idBoisson") REFERENCES "Boisson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoissonClient" ADD CONSTRAINT "BoissonClient_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
