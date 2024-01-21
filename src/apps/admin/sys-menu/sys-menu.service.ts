import { Injectable } from '@nestjs/common';
import { Prisma, SysMenu } from '@prisma/client';
import { groupBy } from 'lodash';

import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SysMenuService {
  constructor(private readonly prisma: PrismaService) {}

  buildTree(list: SysMenu[], childrenGrouped: Record<string, SysMenu[]>) {
    return list.map((row: SysMenu) => {
      const childrenList = childrenGrouped[row.id];
      return {
        path: row.routePath,
        name: row.menuName,
        meta: {
          icon: row.icon,
          title: row.menuName,
        },
        component: row.component,
        ...(childrenList?.length
          ? { children: this.buildTree(childrenList, childrenGrouped) }
          : {}),
      };
    });
  }

  async list() {
    const list = await this.prisma.sysMenu.findMany({
      where: { parentMenuId: null },
      orderBy: { orderNo: 'asc' },
    });
    const others = await this.prisma.sysMenu.findMany({
      where: { parentMenuId: { not: null } },
      orderBy: { orderNo: 'asc' },
    });
    const otherGroups = groupBy(others, 'parentMenuId');
    return this.buildTree(list, otherGroups);
  }

  async create(data: Prisma.SysMenuCreateInput) {
    return this.prisma.sysMenu.create({
      data,
    });
  }
}
