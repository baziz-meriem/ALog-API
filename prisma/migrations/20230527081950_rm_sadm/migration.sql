/*
  Warnings:

  - You are about to drop the `ADM` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SADM` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ADM";

-- DropTable
DROP TABLE "SADM";

-- CreateTable
CREATE TABLE "AC" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "numTel" TEXT NOT NULL,

    CONSTRAINT "AC_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AC_email_key" ON "AC"("email");
