import { ApiProperty } from '@nestjs/swagger';

export class AppointmentResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the appointment',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the patient',
  })
  patientName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the patient',
  })
  patientEmail: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Contact number of the patient',
  })
  phoneNumber: string;

  @ApiProperty({
    example: '2024-03-26T14:30:00Z',
    description: 'Start time of the appointment',
  })
  startTime: Date;

  @ApiProperty({
    example: '2024-03-26T15:00:00Z',
    description: 'End time of the appointment',
  })
  endTime: Date;

  @ApiProperty({
    example: 'Any specific medical conditions or notes',
    description: 'Additional notes for the appointment',
  })
  notes?: string;

  @ApiProperty({
    example: '2024-03-26T10:00:00Z',
    description: 'When the appointment was booked',
  })
  created_at: Date;
}
