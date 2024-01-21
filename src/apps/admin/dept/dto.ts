import { ApiProperty } from '@nestjs/swagger';
import { AvailableStatus } from '@prisma/client';

export class CreateDeptDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  sort: number;
  @ApiProperty({
    enum: AvailableStatus,
  })
  status: AvailableStatus;
  @ApiProperty()
  remark: string;
  @ApiProperty()
  parentDeptId: string;
}
