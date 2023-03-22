import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigType } from '@nestjs/config';
import prismaConfig from 'src/prisma/prisma.config';

import { getDtos } from 'src/utils/getDtos';

import { parse } from 'csv-parse';
import csv from 'csv-parser';

@Injectable()
export class PatientsService {
  private readonly logger = new Logger(PatientsService.name);
  constructor(
    private readonly prisma: PrismaService,
    @Inject(prismaConfig.KEY)
    private readonly configService: ConfigType<typeof prismaConfig>,
  ) {}

  customParser() {
    return csv({
      mapHeaders: ({ header }: any) => header.trim(),
      mapValues: ({ value }: any) => (value === '' ? null : value.trim()),
    });
  }

  async parseFile(file: Express.Multer.File) {
    parse(file.buffer, { columns: true }, async (err, rows) => {
      // try {
      if (err) {
        this.logger.error(err);
        return err;
      }

      for await (const row of rows) {
        const res = getDtos(row);

        const { id, dtos } = res;

        const {
          currentSSN,
          currentHospitalId,
          currentMedicationId,
          currentNurseId,
          currentPractitionerId,
        } = id;

        const {
          patientDTO,
          nurseDTO,
          observationDTO,
          practitionerDTO,
          hospitalDTO,
          medicationDTO,
        } = dtos;
        const patient = await this.prisma.patient.findUnique({
          where: {
            patient_ssn: currentSSN,
          },
        });

        // Check whether te id already exists or not
        const hospital = await this.prisma.hospital.findUnique({
          where: {
            hospital_id: currentHospitalId,
          },
        });

        const medication = await this.prisma.medication.findUnique({
          where: {
            medication_id: currentMedicationId,
          },
        });

        const practitioner = await this.prisma.practitioner.findUnique({
          where: {
            practitioner_id: currentPractitionerId,
          },
        });

        const nurse = await this.prisma.nurse.findUnique({
          where: {
            nurse_id: currentNurseId,
          },
        });

        // insert data into the database
        await this.prisma.$transaction(async (prisma) => {
          if (!patient) {
            await this.prisma.patient.create({
              data: { ...patientDTO },
            });
          }

          if (!practitioner) {
            await prisma.practitioner.create({
              data: { ...practitionerDTO },
            });
          }

          if (!hospital) {
            await prisma.hospital.create({
              data: { ...hospitalDTO },
            });
          }

          if (!medication) {
            await prisma.medication.create({
              data: { ...medicationDTO },
            });
          }

          if (!nurse) {
            await prisma.nurse.create({
              data: { ...nurseDTO },
            });
          }

          await prisma.observation.create({
            data: { ...observationDTO },
          });
        });
      }
    });
  }
}
