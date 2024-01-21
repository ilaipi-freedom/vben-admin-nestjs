import { ApiProperty } from '@nestjs/swagger';
import { AvailableStatus } from '@prisma/client';

export class CreateRoleDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  perm: string;
  @ApiProperty({
    enum: AvailableStatus,
  })
  status: AvailableStatus;
  @ApiProperty()
  route: string;
}
