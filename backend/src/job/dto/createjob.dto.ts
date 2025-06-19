import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ example: 'Full Stack Developer' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'lorem ipsum' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'React.js, Node.js, Next.js, Nest.js' })
  @IsString()
  @IsNotEmpty()
  requirement: string;

  @ApiProperty({ example: '30000tk' })
  @IsString()
  @IsNotEmpty()
  salary: string;

  @ApiProperty({ example: 'Baridhara J Block, Vatara, Dhaka' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'Full Stack Developer' })
  @IsString()
  @IsNotEmpty()
  jobType: string;

  @ApiProperty({ example: 'Assoicate Enginner' })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ example: '2 Years' })
  @IsString()
  @IsNotEmpty()
  experience: string;

  @ApiProperty({ example: '6852d4a6f21090e4f985c677' })
  @IsMongoId()
  @IsNotEmpty()
  company: string;

  //   @IsMongoId()
  //   @IsNotEmpty()
  //   created_by: string;

  //   @IsArray()
  //   @IsOptional()
  //   applications?: string[];
}
