import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { SlotResponseDto } from './dto/slot-response.dto';
import { RecurrenceType } from './enums/recurrence-type.enum';
import { AvailableSlotDto } from './dto/available-slot.dto';
import { SlotStatus } from './enums/slot-status.enum';
import * as moment from 'moment';

interface TimeSlot {
  start: Date;
  end: Date;
}

@Injectable()
export class SlotsService {
  constructor(private prisma: PrismaService) {}

  async createSlots(
    doctorId: string,
    createSlotDto: CreateSlotDto,
  ): Promise<SlotResponseDto> {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

    if (createSlotDto.recurrenceType === RecurrenceType.ONE_TIME) {
      return this.createOneTimeSlot(doctorId, createSlotDto);
    } else {
      if (!createSlotDto.endRecurrenceDate) {
        throw new Error('endRecurrenceDate is required for recurring slots');
      }
      return this.createRecurringSlots(doctorId, createSlotDto);
    }
  }

  private async createOneTimeSlot(
    doctorId: string,
    dto: CreateSlotDto,
  ): Promise<SlotResponseDto> {
    const slots = this.generateSlots(dto.startTime, dto.endTime, dto.duration);

    await this.prisma.slot.createMany({
      data: slots.map((slot) => ({
        doctorId,
        startTime: slot.start,
        endTime: slot.end,
        duration: dto.duration,
        status: 'AVAILABLE',
      })),
    });

    return {
      totalSlotsCreated: slots.length,
      message: 'One-time slots created successfully',
    };
  }

  private async createRecurringSlots(
    doctorId: string,
    dto: CreateSlotDto,
  ): Promise<SlotResponseDto> {
    const recurrenceRule = await this.prisma.recurrenceRule.create({
      data: {
        doctorId,
        recurrenceType: dto.recurrenceType,
        endRecurrenceDate: dto.endRecurrenceDate!,
      },
    });

    let currentDate = new Date(dto.startTime);
    const endDate = new Date(dto.endRecurrenceDate!);
    let totalSlots = 0;

    while (currentDate <= endDate) {
      const dayStart = moment(currentDate)
        .set({
          hour: moment(dto.startTime).hour(),
          minute: moment(dto.startTime).minute(),
        })
        .toDate();
      const dayEnd = moment(currentDate)
        .set({
          hour: moment(dto.endTime).hour(),
          minute: moment(dto.endTime).minute(),
        })
        .toDate();

      const slots = this.generateSlots(dayStart, dayEnd, dto.duration);

      await this.prisma.slot.createMany({
        data: slots.map((slot) => ({
          doctorId,
          startTime: slot.start,
          endTime: slot.end,
          duration: dto.duration,
          status: 'AVAILABLE',
        })),
      });

      totalSlots += slots.length;

      if (dto.recurrenceType === RecurrenceType.DAILY) {
        currentDate = moment(currentDate).add(1, 'day').startOf('day').toDate();
      } else if (dto.recurrenceType === RecurrenceType.WEEKLY) {
        currentDate = moment(currentDate)
          .add(1, 'week')
          .startOf('day')
          .toDate();
      }
    }

    return {
      recurrenceRuleId: recurrenceRule.id,
      totalSlotsCreated: totalSlots,
      message: `Recurring slots created successfully with ${dto.recurrenceType} recurrence`,
    };
  }

  private generateSlots(
    startTime: Date,
    endTime: Date,
    duration: number,
  ): TimeSlot[] {
    const slots: TimeSlot[] = [];
    let current = new Date(startTime);
    const end = new Date(endTime);

    while (current < end) {
      const slotEnd = new Date(current.getTime() + duration * 60000);
      if (slotEnd > end) break;

      slots.push({ start: new Date(current), end: slotEnd });
      current = slotEnd;
    }

    return slots;
  }

  async getAvailableSlots(
    doctorId: string,
    date: string,
  ): Promise<AvailableSlotDto[]> {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

    const startOfDay = moment(date).startOf('day').toDate();
    const endOfDay = moment(date).endOf('day').toDate();

    const availableSlots = await this.prisma.slot.findMany({
      where: {
        doctorId,
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: SlotStatus.AVAILABLE,
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    return availableSlots.map((slot) => ({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      duration: slot.duration,
    }));
  }
}
