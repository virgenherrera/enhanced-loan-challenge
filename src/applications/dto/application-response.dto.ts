import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ApplicationResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  applicantName: string;

  @ApiProperty()
  @Expose()
  applicantLastName: string;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  createdAt: string;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  updatedAt: string;
}
