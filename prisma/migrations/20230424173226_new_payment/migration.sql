-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "paymentIntentId" TEXT;

-- CreateTable
CREATE TABLE "CreditCardType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "CreditCardType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "expMonth" TEXT NOT NULL,
    "expYear" TEXT NOT NULL,
    "cvc" TEXT NOT NULL,
    "idCreditCardType" INTEGER NOT NULL,
    "idConsommateur" INTEGER NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_idCreditCardType_fkey" FOREIGN KEY ("idCreditCardType") REFERENCES "CreditCardType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_idConsommateur_fkey" FOREIGN KEY ("idConsommateur") REFERENCES "Consommateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
