import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

import { CurrentUser } from 'src/common/helpers/current-user';
import { AuthSession } from 'src/types/auth';
import { AccountService } from './account.service';
import { CreateAccountDto, ResetPasswordDto } from './dto';
import { AuthHelper } from 'src/common/helpers/auth-helper';

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
  @Post()
  @ApiBody({
    type: CreateAccountDto,
  })
  async createAccount(@Body() payload: Prisma.AccountCreateInput) {
    return this.service.create(payload);
  }
  @Put(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiBody({
    type: CreateAccountDto,
  })
  async updateAccount(
    @Param('id') id: string,
    @Body() payload: Prisma.AccountCreateInput,
  ) {
    return this.service.update(id, payload);
  }
  @Put('resetPassword/:id')
  @ApiOperation({
    summary: '不需要调用',
    description: '管理员重置用户密码',
  })
  @ApiBody({
    type: ResetPasswordDto,
  })
  async resetPassword(
    @CurrentUser() user: AuthSession,
    @Param('id') id: string,
    @Body() payload: ResetPasswordDto,
  ) {
    if (!AuthHelper.isAdmin(user)) {
      throw new HttpException('仅管理员可以重置密码', HttpStatus.FORBIDDEN);
    }
    return this.service.resetPassword(id, payload);
  }

  @Get()
  @ApiQuery({
    name: 'q',
    required: false,
    description: '搜索关键字',
  })
  @ApiQuery({
    name: 'current',
    type: Number,
    description: '当前页',
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    description: '每页数量',
  })
  async list(
    @Query('q') q: string,
    @Query('current') page = 1,
    @Query('pageSize') limit = 30,
  ) {
    return this.service.list({ q }, page, limit);
  }
  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  async deleteAccount(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
  })
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }
}
