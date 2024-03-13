import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { hashString } from 'src/utils';

export class RegisterDto {
  static AllowedRoles = ['Admin', 'Applicant'] as const;
  static defaultRole: (typeof RegisterDto.AllowedRoles)[number] = 'Applicant';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => hashString(value))
  password: string;

  @ApiProperty({
    description:
      'Role of the user, which is optional but must be either "Admin" or "Applicant" if provided. Defaults to "Applicant".',
    enum: RegisterDto.AllowedRoles,
    required: false,
    default: RegisterDto.defaultRole,
  })
  @IsOptional()
  @IsIn(RegisterDto.AllowedRoles)
  @IsString()
  role = RegisterDto.defaultRole;
}
