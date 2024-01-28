import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import { SysMenuService } from './sys-menu.service';
import { Public } from 'src/common/helpers/public';
import { Prisma } from '@prisma/client';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('sys-menu')
export class SysMenuController {
  constructor(private readonly service: SysMenuService) {}

  @Public()
  @Get()
  async list(@Query('mode') mode: string, @Query('show') show: string) {
    return this.service.list(mode, show);
  }

  @Public()
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
