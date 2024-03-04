import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateSysDictDto } from './dto';
import { SysDictService } from './sys-dict.service';

@ApiTags('字典类型')
@ApiBearerAuth()
@Controller('sys-dict')
export class SysDictController {
  constructor(private readonly sysDictService: SysDictService) {}
  @Post()
  @ApiBody({
    type: CreateSysDictDto,
  })
  async createSysDict(@Body() payload: Prisma.SysDictCreateInput) {
    return this.sysDictService.create(payload);
  }
  @Put(':id')
  @ApiParam({
    name: 'id',
    description: '更新',
  })
  @ApiBody({
    type: CreateSysDictDto,
  })
  async updateSysDict(
    @Param('id') id: number,
    @Body() payload: Prisma.SysDictCreateInput,
  ) {
    return this.sysDictService.update(Number(id), payload);
  }

  @Get()
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: '搜索关键字',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: '当前页，从1开始',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: '每页数量',
  })
  async list(
    @Query('q') q: string,
    @Query('page') page = 1,
    @Query('limit') limit = 30,
  ) {
    return this.sysDictService.list(q, page, limit);
  }
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '删除',
  })
  async deleteSysDict(@Param('id') id: number) {
    return this.sysDictService.remove(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: '字典信息',
    description: '获取单个字典详情',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '字典id',
  })
  async getById(@Param('id') id: number) {
    return this.sysDictService.getById(id);
  }
}
