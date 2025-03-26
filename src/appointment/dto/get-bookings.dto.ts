import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBookingsDto {
  @ApiProperty({
    example: '2024-03-01',
    description: 'Start date for the booking range (YYYY-MM-DD)',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2024-03-31',
    description: 'End date for the booking range (YYYY-MM-DD)',
  })
  @IsDateString()
  endDate: string;
}
