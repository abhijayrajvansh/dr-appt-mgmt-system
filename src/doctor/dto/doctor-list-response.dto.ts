import { ApiProperty } from '@nestjs/swagger';

export class DoctorListResponseDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    description: 'Unique identifier for the doctor',
  })
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the doctor',
  })
  first_name: string;

  @ApiProperty({
    example: 'Smith',
    description: 'Last name of the doctor',
  })
  last_name: string;

  @ApiProperty({
    example: 'john.smith@clinic.com',
    description: 'Email address of the doctor',
  })
  email: string;

  @ApiProperty({
    example: 5,
    description: 'Number of available slots for the doctor',
  })
  available_slots_count: number;
}
