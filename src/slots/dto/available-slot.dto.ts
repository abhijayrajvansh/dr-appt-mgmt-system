import { ApiProperty } from '@nestjs/swagger';

export class AvailableSlotDto {
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
}
