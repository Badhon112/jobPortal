import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CompanyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Name Must me at least 5 carecter long' })
  @ApiProperty({ example: 'Microsoft' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'lorem ipsum' })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'example.com' })
  website: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Baridhara J Block, Vatara, Dhaka' })
  location: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'cloudenary.com' })
  logo: string;
}

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'lorem ipsum' })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'example.com' })
  website: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Baridhara J Block, Vatara, Dhaka' })
  location: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'cloudenary.com' })
  logo: string;
}
