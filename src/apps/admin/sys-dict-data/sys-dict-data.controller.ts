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

import { CreateSysDictDataDto } from './dto';
import { SysDictDataService } from './sys-dict-data.service';

@ApiTags('字典数据')
@ApiBearerAuth()
@Controller('sys-dict-data')
export class SysDictDataController {
  constructor(private readonly sysDictDataService: SysDictDataService) {}
  @Post()
  @ApiBody({
    type: CreateSysDictDataDto,
  })
  async createSysDictData(@Body() payload: Prisma.SysDictDataCreateInput) {
    return this.sysDictDataService.create(payload);
  }
  @Put(':id')
  @ApiParam({
    name: 'id',
    description: '更新',
  })
  @ApiBody({
    type: CreateSysDictDataDto,
  })
  async updateSysDictData(
    @Param('id') id: number,
    @Body() payload: Prisma.SysDictDataCreateInput,
  ) {
    return this.sysDictDataService.update(id, payload);
  }

  @Get()
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
    description: '字典类型',
  })
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: '搜索关键字',
  })
  @ApiQuery({
    name: 'current',
    required: false,
    type: Number,
    description: '当前页，从1开始',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: '每页数量',
  })
  @ApiQuery({
    name: 'pagination',
    required: false,
    type: Boolean,
    description: '是否分页',
  })
  async list(
    @Query('type') type: string,
    @Query('q') q: string,
    @Query('current') page = 1,
    @Query('pageSize') limit = 30,
    pagination: boolean,
  ) {
    return this.sysDictDataService.list(type, q, page, limit, pagination);
  }
  @Delete()
  @ApiParam({
    name: 'id',
    description: '删除',
  })
  async deleteSysDictData(@Param('id') id: number) {
    return this.sysDictDataService.remove(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: '字典数据信息',
    description: '获取单个字典数据详情',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '字典数据id',
  })
  async getById(@Param('id') id: number) {
    return this.sysDictDataService.getById(id);
  }
}
