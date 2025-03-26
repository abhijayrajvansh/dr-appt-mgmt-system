import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({
    example: 'drsmith',
    description: 'Unique username for the doctor',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the doctor',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Smith',
    description: 'Last name of the doctor',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'john.smith@clinic.com',
    description: 'Email address of the doctor',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}