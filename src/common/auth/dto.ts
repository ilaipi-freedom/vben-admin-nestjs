import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: '用户在系统中的id',
  })
  id: string;
  @ApiProperty({
    description:
      '角色。暂时分为：admin / partner 合作伙伴 / insurance 保险公司',
  })
  role: string;
  @ApiProperty({
    description: 'jwt token，后续请求中要带着',
  })
  token: string;
}
