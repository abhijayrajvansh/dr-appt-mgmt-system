import { PickType } from '@nestjs/mapped-types';
import { Doctor } from '../entities/doctor.entity';
import { ApiProperty } from '@nestjs/swagger';

export class DoctorResponseDto extends PickType(Doctor, [
  'id',
  'username',
  'first_name',
  'last_name',
  'email',
  'created_at',
]) {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    description: 'Unique identifier for the doctor',
  })
  id: string;

  @ApiProperty({
    example: 'drsmith',
    description: 'Username of the doctor',
  })
  username: string;

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
    example: '2023-07-20T12:00:00.000Z',
    description: 'Date when the doctor was created',
  })
  created_at: Date;
}