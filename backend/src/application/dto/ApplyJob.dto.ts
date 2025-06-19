import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class uploadApplication {
  @ApiProperty({ example: '6853a6cbc25a20a3d44905e6' })
  @IsMongoId()
  @IsNotEmpty()
  jobId: string;
}

export class Status {
  @ApiProperty({ example: 'accepted' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
