import { Injectable } from '@nestjs/common';
import { AvailableStatus, Prisma, Role } from '@prisma/client';

import { fmtBy } from 'src/common/helpers/date-helper';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.RoleCreateInput) {
    const { menu, ...others } = JSON.parse(JSON.stringify(data));
    const role = await this.prisma.role.create({ data: others });
    if (menu?.length) {
      await this.prisma.roleMenuConfig.createMany({
        data: menu.map((sysMenuId: string) => ({ sysMenuId, roleId: role.id })),
      });
    }
    return role;
  }

  async remove(id: string) {
    return this.prisma.role.delete({ where: { id } });
  }

  async update(id: string, data: Prisma.RoleCreateInput) {
    const { menu, ...others } = JSON.parse(JSON.stringify(data));
    return await this.prisma.$transaction(async (prisma: PrismaService) => {
      await prisma.roleMenuConfig.deleteMany({
        where: {
          roleId: id,
        },
      });
      await prisma.roleMenuConfig.createMany({
        data: menu.map((sysMenuId: string) => ({ sysMenuId, roleId: id })),
      });
      return prisma.role.update({
        where: { id },
        data: others,
      });
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
    return {
      total,
      list: list.map((row: Role) => ({
        ...row,
        createdAt: fmtBy(row.createdAt, 'yyyy-MM-dd HH:mm'),
      })),
    };
  }

  async getById(id: string) {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }
}
