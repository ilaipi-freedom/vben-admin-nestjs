import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

import { SysMenuService } from './sys-menu.service';
import { CurrentUser } from 'src/common/helpers/current-user';
import { AuthSession } from 'src/types/auth';

@Controller('sys-menu')
@ApiBearerAuth()
export class SysMenuController {
  constructor(private readonly service: SysMenuService) {}

  @Get('/perm')
  async permList(@CurrentUser() user: AuthSession) {
    return this.service.permList(user);
  }

  @Get()
  async list() {
    return this.service.list();
  }

  @Post()
  async create(@Body() payload: Prisma.SysMenuCreateInput) {
    return this.service.create(payload);
  }
  @Put(':id')
  @ApiParam({
    name: 'id',
    description: '更新',
  })
  async updateDept(
    @Param('id') id: string,
    @Body() payload: Prisma.SysMenuUpdateInput,
  ) {
    return this.service.update(id, payload);
  }
}
