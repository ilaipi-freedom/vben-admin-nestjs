import { ApiProperty } from '@nestjs/swagger';
import { SysDictCategory } from '@prisma/client';

export class CreateSysDictDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  remark: string;
  @ApiProperty({
    enum: SysDictCategory,
  })
  category: SysDictCategory;
}
