import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { DoctorModule } from './doctor/doctor.module';
import { SlotsModule } from './slots/slots.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [PrismaModule, DoctorModule, SlotsModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
