import { ApiProperty } from '@nestjs/swagger';
import { AvailableStatus } from '@prisma/client';

export class CreateAccountDto {
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty()
  username: string;
  @ApiProperty({
    enum: AvailableStatus,
    required: false,
  })
  status: AvailableStatus;
  @ApiProperty()
  password: string;
  @ApiProperty({ required: false })
  phone: string;
  @ApiProperty({
    required: false,
    description: '可以留空',
  })
  roleId: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  password: string;
}
