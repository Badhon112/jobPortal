import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  Matches,
} from 'class-validator';
import { User } from 'src/models/user.model';

export class CreateUserDto {
  @ApiProperty({ example: 'test user' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '01234567891' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'test123#' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'student' })
  @IsNotEmpty()
  @IsEnum(['student', 'recruiter'], {
    message: 'Role must be either student or recruiter',
  })
  role: User['role'];

  @ApiProperty({ example: 'lorem Ipsum' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: 'Lorem Ipsum' })
  @IsOptional()
  @IsString()
  skill?: string;
}

export class Register {
  @ApiProperty({ example: 'test user' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email format',
  })
  email: string;

  @ApiProperty({ example: '01234567891' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'test123#' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'student' })
  @IsNotEmpty()
  @IsEnum(['student', 'recruiter'], {
    message: 'Role must be either student or recruiter',
  })
  role: User['role'];
}

export class Login {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email format',
  })
  email: string;

  @ApiProperty({ example: 'test123#' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'student' })
  @IsNotEmpty()
  @IsEnum(['student', 'recruiter'], {
    message: 'Role must be either student or recruiter',
  })
  role: User['role'];
}
