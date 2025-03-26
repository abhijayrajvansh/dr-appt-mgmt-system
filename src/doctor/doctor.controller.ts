import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorResponseDto } from './dto/doctor-response.dto';
import { DoctorListResponseDto } from './dto/doctor-list-response.dto';
import { AppointmentService } from '../appointment/appointment.service';
import { AppointmentResponseDto } from '../appointment/dto/appointment-response.dto';
import { GetBookingsDto } from '../appointment/dto/get-bookings.dto';
import {
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly appointmentService: AppointmentService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all doctors',
    description:
      'Retrieves a list of all doctors with their available slots count',
  })
  @ApiOkResponse({
    description: 'List of doctors retrieved successfully',
    type: [DoctorListResponseDto],
  })
  async getAllDoctors(): Promise<DoctorListResponseDto[]> {
    return this.doctorService.getAllDoctors();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new doctor',
    description:
      'Creates a new doctor record after validating uniqueness of email and username',
  })
  @ApiBody({
    type: CreateDoctorDto,
    description: 'Doctor creation payload',
    examples: {
      basic: {
        summary: 'Basic Doctor',
        value: {
          username: 'drsmith',
          first_name: 'John',
          last_name: 'Smith',
          email: 'john.smith@clinic.com',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Doctor successfully created',
    type: DoctorResponseDto,
  })
  @ApiConflictResponse({
    description: 'Conflict - duplicate email or username',
    schema: {
      example: {
        statusCode: 409,
        message: 'Doctor with this email already exists',
        error: 'Conflict',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - validation error',
    schema: {
      example: {
        statusCode: 400,
        message: ['email must be a valid email', 'username must not be empty'],
        error: 'Bad Request',
      },
    },
  })
  async create(
    @Body() createDoctorDto: CreateDoctorDto,
  ): Promise<DoctorResponseDto> {
    return this.doctorService.create(createDoctorDto);
  }

  @Get(':doctorId/bookings')
  @ApiOperation({
    summary: 'Get all booked appointments for a doctor',
    description:
      'Retrieves all booked appointments for a doctor within a date range',
  })
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
    description: 'Start date for the booking range (YYYY-MM-DD)',
    example: '2024-03-01',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
    description: 'End date for the booking range (YYYY-MM-DD)',
    example: '2024-03-31',
  })
  @ApiOkResponse({
    description: 'List of booked appointments retrieved successfully',
    type: [AppointmentResponseDto],
  })
  @ApiOkResponse({
    description: 'No bookings found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'No bookings found for this doctor.'
        }
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Doctor not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid date format',
  })
  async getBookings(
    @Param('doctorId') doctorId: string,
    @Query() query: GetBookingsDto,
  ): Promise<AppointmentResponseDto[] | { message: string }> {
    return this.appointmentService.getBookings(
      doctorId,
      query.startDate,
      query.endDate,
    );
  }
}
