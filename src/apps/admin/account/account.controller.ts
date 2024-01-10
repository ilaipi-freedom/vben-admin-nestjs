import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { CurrentUser } from 'src/common/helpers/current-user';
import { AuthSession } from 'src/types/auth';

@ApiTags('账号')
@ApiBearerAuth()
@Controller('account')
export class AccountController {
  @Get('/info')
  async info(@CurrentUser() user: AuthSession) {
    return user;
  }
}
