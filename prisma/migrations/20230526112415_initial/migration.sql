-- CreateTable
CREATE TABLE "TentativeVol" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "idDistributeur" INTEGER NOT NULL,

    CONSTRAINT "TentativeVol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ADM" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "numTel" TEXT NOT NULL,
    "idClient" INTEGER NOT NULL,
    "resetPasswordCode" TEXT NOT NULL DEFAULT '',
    "resetPasswordExpire" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ADM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SADM" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "numTel" TEXT NOT NULL,
    "idClient" INTEGER NOT NULL,
    "resetPasswordCode" TEXT NOT NULL DEFAULT '',
    "resetPasswordExpire" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SADM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consommateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "numTel" TEXT NOT NULL,
    "resetPasswordCode" TEXT NOT NULL DEFAULT '',
    "resetPasswordExpire" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consommateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boisson" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Boisson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "etat" TEXT NOT NULL,
    "idConsommateur" INTEGER,
    "idDistributeur" INTEGER NOT NULL,
    "idBoisson" INTEGER NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "paymentIntentId" TEXT,
    "montant" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "etat" TEXT NOT NULL,
    "typeCarte" TEXT NOT NULL,
    "monnaie" TEXT NOT NULL,
    "idCommande" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ADM_email_key" ON "ADM"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SADM_email_key" ON "SADM"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Consommateur_email_key" ON "Consommateur"("email");

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_idBoisson_fkey" FOREIGN KEY ("idBoisson") REFERENCES "Boisson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_idConsommateur_fkey" FOREIGN KEY ("idConsommateur") REFERENCES "Consommateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_idCommande_fkey" FOREIGN KEY ("idCommande") REFERENCES "Commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;
