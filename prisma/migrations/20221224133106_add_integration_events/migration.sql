-- CreateTable
CREATE TABLE "IntegrationEvents" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "IntegrationEvents_pkey" PRIMARY KEY ("id")
);
