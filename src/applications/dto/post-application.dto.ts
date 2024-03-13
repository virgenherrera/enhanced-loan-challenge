import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostApplicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  applicantName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  applicantLastName: string;
}
