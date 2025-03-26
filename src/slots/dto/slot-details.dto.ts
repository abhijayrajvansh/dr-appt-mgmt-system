import { ApiProperty } from '@nestjs/swagger';
import { SlotStatus } from '../enums/slot-status.enum';

export class SlotDetailsDto {
  @ApiProperty({
    description: 'ID of the slot',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Start time of the slot',
    example: '2024-03-25T09:00:00Z',
  })
  startTime: Date;

  @ApiProperty({
    description: 'End time of the slot',
    example: '2024-03-25T09:30:00Z',
  })
  endTime: Date;

  @ApiProperty({
    description: 'Duration of the slot in minutes',
    example: 30,
  })
  duration: number;

  @ApiProperty({
    description: 'Status of the slot',
    enum: SlotStatus,
    example: SlotStatus.AVAILABLE,
  })
  status: SlotStatus;

  @ApiProperty({
    description: 'Doctor details',
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      username: 'drsmith',
      first_name: 'John',
      last_name: 'Smith',
      email: 'john.smith@clinic.com',
    },
  })
  doctor: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };

  @ApiProperty({
    description: 'Patient details if slot is booked',
    required: false,
    example: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phoneNumber: '+1234567890',
      notes: 'First time visit',
    },
  })
  patient?: {
    name: string;
    email: string;
    phoneNumber: string;
    notes?: string;
  };
}
