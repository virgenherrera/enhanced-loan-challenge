import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class PostApplicationDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  applicantName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  applicantLastName: string;
}
