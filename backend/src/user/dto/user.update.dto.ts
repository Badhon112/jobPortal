import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/models/user.model';

export class UpdateUserDto {
  @ApiProperty({ example: 'test user' })
  @IsOptional()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '01234567891' })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  //   @ApiProperty({ example: 'student' })
  //   @IsNotEmpty()
  //   @IsEnum(['student', 'recruiter'], {
  //     message: 'Role must be either student or recruiter',
  //   })
  //   role: User['role'];

  @ApiProperty({ example: 'lorem Ipsum' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: 'React, Node.js' })
  @IsOptional()
  @IsString()
  skill?: string;
}
