import { Controller, Post, Param, Body } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { BookAppointmentDto } from './dto/book-appointment.dto';
import { AppointmentResponseDto } from './dto/appointment-response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('appointments')
@Controller('slots')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post(':slotId/book')
  @ApiOperation({
    summary: 'Book an appointment for a slot',
    description:
      'Books an appointment for a specific slot with patient information',
  })
  @ApiParam({
    name: 'slotId',
    description: 'ID of the slot to book',
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: BookAppointmentDto })
  @ApiResponse({
    status: 201,
    description: 'Appointment successfully booked',
    type: AppointmentResponseDto,
  })
  @ApiConflictResponse({
    description: 'Slot is already booked',
    schema: {
      example: {
        statusCode: 409,
        message: 'Slot is already booked',
        error: 'Conflict',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Slot not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Slot not found',
        error: 'Not Found',
      },
    },
  })
  async bookSlot(
    @Param('slotId') slotId: string,
    @Body() bookingData: BookAppointmentDto,
  ): Promise<AppointmentResponseDto> {
    return this.appointmentService.bookSlot(slotId, bookingData);
  }
}
