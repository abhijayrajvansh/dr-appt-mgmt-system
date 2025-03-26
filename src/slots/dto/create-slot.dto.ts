import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RecurrenceType } from '../enums/recurrence-type.enum';

export class CreateSlotDto {
  @ApiProperty({ example: '2023-01-01T09:00:00Z' })
  @IsDateString()
  startTime: Date;

  @ApiProperty({ example: '2023-01-01T11:00:00Z' })
  @IsDateString()
  endTime: Date;

  @ApiProperty({ example: 30 })
  @IsInt()
  duration: number;

  @ApiProperty({
    enum: RecurrenceType,
    example: RecurrenceType.ONE_TIME,
    default: RecurrenceType.ONE_TIME,
  })
  @IsEnum(RecurrenceType)
  @IsOptional()
  recurrenceType?: RecurrenceType = RecurrenceType.ONE_TIME;

  @ApiProperty({
    required: false,
    example: '2023-01-31T00:00:00Z',
    description: 'Required if recurrenceType is not ONE_TIME',
  })
  @IsDateString()
  @IsOptional()
  endRecurrenceDate?: Date;
}
