import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { LoginDto, LoginResponseDto } from './dto';
import { AuthService } from './auth.service';
import { Public } from '../helpers/public';
import { CurrentUser } from '../helpers/current-user';
import { AuthSession } from '../../types/auth';

@Controller('auth')
@ApiTags('认证')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiBody({
    type: LoginDto,
  })
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  async login(@Body() payload: LoginDto) {
    return this.authService.signIn(payload.username, payload.password);
  }

  @Post('logout')
  async logout(@CurrentUser() payload: AuthSession) {
    return this.authService.signOut(payload);
  }
}
