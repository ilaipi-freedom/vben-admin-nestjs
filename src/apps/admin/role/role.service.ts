import { Injectable } from '@nestjs/common';
import { AvailableStatus, Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.RoleCreateInput) {
    return this.prisma.role.create({ data });
  }

  async remove(id: string) {
    return this.prisma.role.delete({ where: { id } });
  }

  async update(id: string, data: Prisma.RoleCreateInput) {
    return this.prisma.role.update({
      where: { id },
      data,
    });
  }
  async list(q: string, status: AvailableStatus, page = 1, limit = 30) {
    const where: Prisma.RoleWhereInput = {};
    if (q) {
      where.name = { contains: q };
    }
    if (status) {
      where.status = status;
    }
    const total = await this.prisma.role.count({ where });
    const list = await this.prisma.role.findMany({
      where,
      skip: (page - 1) * limit,
      take: Number(limit),
    });
    return { total, list };
  }

  async getById(id: string) {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }
}
