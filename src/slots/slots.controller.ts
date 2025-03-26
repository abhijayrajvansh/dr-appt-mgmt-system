import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SlotsService } from './slots.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { SlotResponseDto } from './dto/slot-response.dto';
import { AvailableSlotDto } from './dto/available-slot.dto';

@ApiTags('slots')
@Controller('doctors')
@ApiExtraModels(AvailableSlotDto)
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  //create/add new slots for a doctor
  @Post(':doctorId/slots')
  @ApiOperation({ summary: 'Create new slots for a doctor' })
  @ApiResponse({
    status: 201,
    description: 'Slots created successfully',
    type: SlotResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async createSlots(
    @Param('doctorId') doctorId: string,
    @Body() createSlotDto: CreateSlotDto,
  ): Promise<SlotResponseDto> {
    return this.slotsService.createSlots(doctorId, createSlotDto);
  }

  // get all available slots of a doctor
  @Get(':doctorId/available_slots')
  @ApiOperation({
    summary: 'Get available slots for a doctor on a specific date',
  })
  @ApiQuery({
    name: 'date',
    description: 'The date to check for available slots (YYYY-MM-DD)',
    example: '2024-03-25',
  })
  @ApiResponse({
    status: 200,
    description: 'List of available slots or message if none available',
    schema: {
      oneOf: [
        {
          type: 'array',
          items: { $ref: '#/components/schemas/AvailableSlotDto' },
        },
        {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'No slots available' },
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async getAvailableSlots(
    @Param('doctorId') doctorId: string,
    @Query('date') date: string,
  ): Promise<AvailableSlotDto[] | { message: string }> {
    return this.slotsService.getAvailableSlots(doctorId, date);
  }
}
