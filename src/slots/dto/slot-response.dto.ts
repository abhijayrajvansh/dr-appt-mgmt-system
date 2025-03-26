import { ApiProperty } from '@nestjs/swagger';

export class SlotResponseDto {
  @ApiProperty({
    description: 'ID of the created recurrence rule (if applicable)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false
  })
  recurrenceRuleId?: string;

  @ApiProperty({
    description: 'Total number of slots created',
    example: 10
  })
  totalSlotsCreated: number;

  @ApiProperty({
    description: 'Message about the operation',
    example: 'Slots created successfully'
  })
  message: string;
}