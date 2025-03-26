// src/doctor/doctor.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto) {
    try {
      return await this.prisma.doctor.create({
        data: createDoctorDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const field = (error.meta?.target as string[])[0];
          throw new ConflictException(`Doctor with this ${field} already exists`);
        }
      }
      throw error;
    }
  }

  async getAllDoctors() {
    const doctors = await this.prisma.doctor.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        slots: {
          where: {
            status: 'AVAILABLE'
          }
        }
      }
    });

    return doctors.map(doctor => ({
      id: doctor.id,
      first_name: doctor.first_name,
      last_name: doctor.last_name,
      email: doctor.email,
      available_slots_count: doctor.slots.length
    }));
  }
}