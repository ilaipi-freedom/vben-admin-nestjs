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
import { AvailableStatus, Prisma } from '@prisma/client';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';

import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto';

@Controller('dept')
@ApiTags('角色')
@ApiBearerAuth()
@Controller('dept')
export class DeptController {
  constructor(private readonly service: DeptService) {}
  @Post()
  @ApiBody({
    type: CreateDeptDto,
  })
  async createDept(@Body() payload: Prisma.DeptCreateInput) {
    return this.service.create(payload);
  }
  @Put(':id')
  @ApiParam({
    name: 'id',
    description: '更新',
  })
  @ApiBody({
    type: CreateDeptDto,
  })
  async updateDept(
    @Param('id') id: string,
    @Body() payload: Prisma.DeptCreateInput,
  ) {
    return this.service.update(id, payload);
  }

  @Get()
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: '搜索关键字',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: AvailableStatus,
    description: '状态',
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
    @Query('status') status: AvailableStatus,
    @Query('current') page = 1,
    @Query('pageSize') limit = 30,
  ) {
    return this.service.list(q, status, page, limit);
  }
  @Delete()
  @ApiOperation({
    summary: '删除',
    description: '删除',
  })
  @ApiParam({
    name: 'id',
    description: '部门 id',
  })
  async deleteDept(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: '部门',
    description: '获取单个部门详情',
  })
  @ApiParam({
    name: 'id',
    description: '部门id',
  })
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }
}
