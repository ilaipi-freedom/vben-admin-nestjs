import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { keyBy, map, uniq } from 'lodash';

import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SysDictDataService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SysDictDataCreateInput) {
    return this.prisma.sysDictData.create({ data });
  }

  async remove(id: number) {
    return this.prisma.sysDictData.delete({ where: { id: Number(id) } });
  }

  async update(id: number, data: Prisma.SysDictDataUpdateInput) {
    return this.prisma.sysDictData.update({
      where: { id: Number(id) },
      data,
    });
  }
  async list(type: string, q: string, page = 1, limit = 30, pagination = true) {
    const where: Prisma.SysDictDataWhereInput = {};
    if (type) {
      where.type = type;
    }
    if (q) {
      where.OR = [
        { label: { contains: q } },
        { value: { contains: q } },
        { remark: { contains: q } },
      ];
    }
    const total = await this.prisma.sysDictData.count({ where });
    const list = await this.prisma.sysDictData.findMany({
      where,
      ...(pagination
        ? {
            skip: (page - 1) * limit,
            take: Number(limit),
          }
        : {}),
    });
    const sysDictTypes = uniq(map(list, 'type'));
    const sysDict = await this.prisma.sysDict.findMany({
      where: { type: { in: sysDictTypes } },
    });
    const sysDictMap = keyBy(sysDict, 'type');
    return {
      total,
      list: list.map((row: any) => ({
        ...row,
        sysDict: sysDictMap[row.type],
      })),
    };
  }

  async getById(id: number) {
    return this.prisma.sysDictData.findUnique({
      where: { id: Number(id) },
    });
  }
}
