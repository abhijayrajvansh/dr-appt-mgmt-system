import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AppointmentModule } from '../appointment/appointment.module';
import { AppointmentService } from '../appointment/appointment.service';

@Module({
  imports: [PrismaModule, AppointmentModule],
  controllers: [DoctorController],
  providers: [DoctorService, AppointmentService],
})
export class DoctorModule {}
