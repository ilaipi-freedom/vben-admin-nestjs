import { Injectable } from '@nestjs/common';
import { AvailableStatus, Prisma, Dept } from '@prisma/client';

import { fmtBy } from 'src/common/helpers/date-helper';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class DeptService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.DeptCreateInput) {
    return this.prisma.dept.create({ data });
  }

  async remove(id: string) {
    return this.prisma.dept.delete({ where: { id } });
  }

  async update(id: string, data: Prisma.DeptCreateInput) {
    return this.prisma.dept.update({
      where: { id },
      data,
    });
  }
  async list(q: string, status: AvailableStatus, page = 1, limit = 30) {
    const where: Prisma.DeptWhereInput = {};
    if (q) {
      where.name = { contains: q };
    }
    if (status) {
      where.status = status;
    }
    const total = await this.prisma.dept.count({ where });
    const list = await this.prisma.dept.findMany({
      where,
      skip: (page - 1) * limit,
      take: Number(limit),
    });
    return {
      total,
      list: list.map((row: Dept) => ({
        ...row,
        createdAt: fmtBy(row.createdAt, 'yyyy-MM-dd HH:mm'),
      })),
    };
  }

  async getById(id: string) {
    return this.prisma.dept.findUnique({
      where: { id },
    });
  }
}
