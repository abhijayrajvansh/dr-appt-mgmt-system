import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookAppointmentDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the patient',
  })
  @IsString()
  @IsNotEmpty()
  patientName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the patient',
  })
  @IsEmail()
  @IsNotEmpty()
  patientEmail: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Contact number of the patient',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'Any specific medical conditions or notes',
    description: 'Additional notes for the appointment',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
