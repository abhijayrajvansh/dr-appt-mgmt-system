import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookAppointmentDto } from './dto/book-appointment.dto';
import { AppointmentResponseDto } from './dto/appointment-response.dto';
import { SlotStatus } from '@prisma/client';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async bookSlot(
    slotId: string,
    bookingData: BookAppointmentDto,
  ): Promise<AppointmentResponseDto> {
    
    // Get the slot and check if it exists and is available
    const slot = await this.prisma.slot.findUnique({
      where: { id: slotId },
    });

    if (!slot) {
      throw new NotFoundException('Slot not found');
    }

    if (slot.status === SlotStatus.BOOKED) {
      throw new ConflictException('Slot is already booked');
    }

    // Use a transaction to ensure atomicity
    try {
      const appointment = await this.prisma.$transaction(async (prisma) => {
        // Update slot status to BOOKED
        const updatedSlot = await prisma.slot.update({
          where: { id: slotId },
          data: { status: SlotStatus.BOOKED },
        });

        // Create appointment
        const appointment = await prisma.appointment.create({
          data: {
            ...bookingData,
            slotId,
          },
          include: {
            slot: true,
          },
        });

        return appointment;
      });

      // Map to response DTO
      return {
        id: appointment.id,
        patientName: appointment.patientName,
        patientEmail: appointment.patientEmail,
        phoneNumber: appointment.phoneNumber,
        startTime: appointment.slot.startTime,
        endTime: appointment.slot.endTime,
        notes: appointment.notes || undefined, // Convert null to undefined
        created_at: appointment.created_at,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Slot is already booked');
      }
      throw error;
    }
  }
}
