import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SysDictService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SysDictCreateInput) {
    return this.prisma.sysDict.create({ data });
  }

  async remove(id: number) {
    return this.prisma.sysDict.delete({ where: { id } });
  }

  async update(id: number, data: Prisma.SysDictUpdateInput) {
    return this.prisma.sysDict.update({
      where: { id },
      data,
    });
  }
  async list(q: string, page = 1, limit = 30) {
    const where: Prisma.SysDictWhereInput = {};
    if (q) {
      where.OR = [{ name: { contains: q } }];
    }
    const total = await this.prisma.sysDict.count({ where });
    const list = await this.prisma.sysDict.findMany({
      where,
      skip: (page - 1) * limit,
      take: Number(limit),
    });
    return { total, list };
  }

  async getById(id: number) {
    return this.prisma.sysDict.findUnique({
      where: { id: Number(id) },
    });
  }
}
