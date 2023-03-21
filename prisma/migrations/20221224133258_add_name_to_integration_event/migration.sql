/*
  Warnings:

  - Added the required column `name` to the `IntegrationEvents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IntegrationEvents" ADD COLUMN     "name" TEXT NOT NULL;
