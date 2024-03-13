import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class PostApplicationDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  applicantName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  applicantLastName: string;
}
