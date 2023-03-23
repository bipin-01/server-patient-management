/*
  Warnings:

  - You are about to drop the `IntegrationEvents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Widget` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('M', 'F', 'O');

-- DropTable
DROP TABLE "IntegrationEvents";

-- DropTable
DROP TABLE "Widget";

-- CreateTable
CREATE TABLE "Patient" (
    "patient_ssn" TEXT NOT NULL,
    "patient_firstname" TEXT NOT NULL,
    "patient_lastname" TEXT NOT NULL,
    "patient_country" TEXT NOT NULL,
    "patient_address1" TEXT NOT NULL,
    "patient_address2" TEXT NOT NULL,
    "patient_number1" TEXT NOT NULL,
    "patient_number2" TEXT,
    "patient_sex" "Sex" NOT NULL,
    "patient_dob" TIMESTAMP(3),
    "patient_dod" TIMESTAMP(3),
    "patient_email" TEXT NOT NULL,
    "patient_height" DOUBLE PRECISION NOT NULL,
    "patient_weight" DOUBLE PRECISION NOT NULL,
    "patient_bloodtype" TEXT NOT NULL,
    "patient_education_background" TEXT,
    "patient_occupation" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("patient_ssn")
);

-- CreateTable
CREATE TABLE "Practitioner" (
    "practitioner_id" TEXT NOT NULL,
    "practitioner_firstname" TEXT,
    "practitioner_lastname" TEXT,
    "practitioner_address1" TEXT,
    "practitioner_address2" TEXT,
    "practitioner_number1" TEXT,
    "practitioner_number2" TEXT,
    "practitioner_checkin" TIMESTAMP(3),
    "practitioner_checkout" TIMESTAMP(3),

    CONSTRAINT "Practitioner_pkey" PRIMARY KEY ("practitioner_id")
);

-- CreateTable
CREATE TABLE "Hospital" (
    "hospital_id" TEXT NOT NULL,
    "hospital_name" TEXT NOT NULL,
    "hospital_address" TEXT NOT NULL,
    "hospital_number" TEXT NOT NULL,
    "hospital_email" TEXT NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("hospital_id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "medication_id" TEXT NOT NULL,
    "medication_name" TEXT NOT NULL,
    "medication_company" TEXT NOT NULL,
    "medication_level" TEXT NOT NULL,
    "medication_remark" TEXT NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("medication_id")
);

-- CreateTable
CREATE TABLE "Nurse" (
    "nurse_id" TEXT NOT NULL,
    "nurse_firstname" TEXT NOT NULL,
    "nurse_lastname" TEXT NOT NULL,
    "nurse_address1" TEXT NOT NULL,
    "nurse_address2" TEXT,
    "nurse_number1" TEXT,
    "nurse_checkIn" TIMESTAMP(3),
    "nurse_checkOut" TIMESTAMP(3),

    CONSTRAINT "Nurse_pkey" PRIMARY KEY ("nurse_id")
);

-- CreateTable
CREATE TABLE "Observation" (
    "observation_id" TEXT NOT NULL,
    "observation_date" TIMESTAMP(3),
    "observation_time" TIMESTAMP(3),
    "observation_remark" TEXT NOT NULL,
    "patient_ssn" TEXT NOT NULL,
    "practitioner_id" TEXT NOT NULL,
    "nurse_id" TEXT NOT NULL,
    "medication_id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("observation_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_patient_ssn_key" ON "Patient"("patient_ssn");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_hospital_email_key" ON "Hospital"("hospital_email");

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_patient_ssn_fkey" FOREIGN KEY ("patient_ssn") REFERENCES "Patient"("patient_ssn") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_practitioner_id_fkey" FOREIGN KEY ("practitioner_id") REFERENCES "Practitioner"("practitioner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_nurse_id_fkey" FOREIGN KEY ("nurse_id") REFERENCES "Nurse"("nurse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_medication_id_fkey" FOREIGN KEY ("medication_id") REFERENCES "Medication"("medication_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("hospital_id") ON DELETE RESTRICT ON UPDATE CASCADE;
