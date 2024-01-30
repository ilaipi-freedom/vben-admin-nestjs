import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { CurrentUser } from 'src/common/helpers/current-user';
import { AuthSession } from 'src/types/auth';
import { AccountService } from './account.service';

@ApiTags('账号')
@ApiBearerAuth()
@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {}
  @Get('/info')
  async info(@CurrentUser() user: AuthSession) {
    return this.service.getAccountInfo(user);
  }

  @Get('/permCode')
  async permCode(@CurrentUser() user: AuthSession) {
    return this.service.getPermCode(user);
  }

  @Get('/permCode/:roleId')
  async permCodeByRole(@Param('roleId') roleId: string) {
    return this.service.getPermCodeByRole(roleId);
  }
}
