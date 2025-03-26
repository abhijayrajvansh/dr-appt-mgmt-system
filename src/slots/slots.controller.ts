import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SlotsService } from './slots.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { SlotResponseDto } from './dto/slot-response.dto';

@ApiTags('slots')
@Controller('doctors')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

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
}
