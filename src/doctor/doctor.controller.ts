import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorResponseDto } from './dto/doctor-response.dto';
import { DoctorListResponseDto } from './dto/doctor-list-response.dto';
import { 
  ApiOperation, 
  ApiTags, 
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse
} from '@nestjs/swagger';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Get all doctors',
    description: 'Retrieves a list of all doctors with their available slots count'
  })
  @ApiOkResponse({
    description: 'List of doctors retrieved successfully',
    type: [DoctorListResponseDto]
  })
  async getAllDoctors(): Promise<DoctorListResponseDto[]> {
    return this.doctorService.getAllDoctors();
  }

  @Post()
  @ApiOperation({ 
    summary: 'Create a new doctor',
    description: 'Creates a new doctor record after validating uniqueness of email and username'
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
          email: 'john.smith@clinic.com'
        }
      }
    }
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
        error: 'Conflict'
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - validation error',
    schema: {
      example: {
        statusCode: 400,
        message: ['email must be a valid email', 'username must not be empty'],
        error: 'Bad Request'
      }
    }
  })
  async create(
    @Body() createDoctorDto: CreateDoctorDto,
  ): Promise<DoctorResponseDto> {
    return this.doctorService.create(createDoctorDto);
  }
}