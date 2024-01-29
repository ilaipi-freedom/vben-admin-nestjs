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

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto';

@Controller('role')
@ApiTags('角色')
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post()
  @ApiBody({
    type: CreateRoleDto,
  })
  async createRole(@Body() payload: Prisma.RoleCreateInput) {
    return this.roleService.create(payload);
  }
  @Put(':id')
  @ApiParam({
    name: 'id',
    description: '更新',
  })
  @ApiBody({
    type: CreateRoleDto,
  })
  async updateRole(
    @Param('id') id: string,
    @Body() payload: Prisma.RoleCreateInput,
  ) {
    return this.roleService.update(id, payload);
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
    name: 'isAll',
    required: false,
    type: Boolean,
    description: '是否全部',
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
    @Query('isAll') isAll: boolean,
    @Query('current') page = 1,
    @Query('pageSize') limit = 30,
  ) {
    return this.roleService.list(q, status, isAll, page, limit);
  }
  @Delete()
  @ApiOperation({
    summary: '删除',
    description: '删除',
  })
  @ApiParam({
    name: 'id',
    description: '角色 id',
  })
  async deleteRole(@Param('id') id: string) {
    return this.roleService.remove(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: '角色信息',
    description: '获取单个角色详情',
  })
  @ApiParam({
    name: 'id',
    description: '角色id',
  })
  async getById(@Param('id') id: string) {
    return this.roleService.getById(id);
  }
}
