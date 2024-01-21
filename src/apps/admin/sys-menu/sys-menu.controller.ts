import { Body, Controller, Get, Post } from '@nestjs/common';

import { SysMenuService } from './sys-menu.service';
import { Public } from 'src/common/helpers/public';
import { Prisma } from '@prisma/client';

@Controller('sys-menu')
export class SysMenuController {
  constructor(private readonly service: SysMenuService) {}

  @Public()
  @Get()
  async list() {
    return this.service.list();
  }

  @Public()
  @Post()
  async create(@Body() payload: Prisma.SysMenuCreateInput) {
    return this.service.create(payload);
  }
}
