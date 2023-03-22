import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import prismaConfig from 'src/prisma/prisma.config';
@Module({
  imports: [PrismaModule, ConfigModule.forFeature(prismaConfig)],
  controllers: [PatientsController],
  providers: [PatientsService, PrismaService],
})
export class PatientsModule {}
