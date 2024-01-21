import { ApiProperty } from '@nestjs/swagger';

export class CreateSysDictDataDto {
  @ApiProperty({
    required: false,
  })
  sort?: number;
  @ApiProperty()
  label: string;
  @ApiProperty()
  value: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  remark: string;
  @ApiProperty()
  extra: Record<string, any>;
}
