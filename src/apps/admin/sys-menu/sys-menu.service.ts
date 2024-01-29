import { Injectable } from '@nestjs/common';
import { Prisma, SysMenu, SysMenuType } from '@prisma/client';
import { groupBy } from 'lodash';
import { fmtBy } from 'src/common/helpers/date-helper';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthSession } from 'src/types/auth';
import { AccountService } from '../account/account.service';

@Injectable()
export class SysMenuService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accountService: AccountService,
  ) {}

  buildTree(
    mode: string,
    list: SysMenu[],
    childrenGrouped: Record<string, SysMenu[]>,
  ) {
    return list.map((row: SysMenu) => {
      const childrenList = childrenGrouped[row.id];
      const base = {
        ...(childrenList?.length
          ? { children: this.buildTree(mode, childrenList, childrenGrouped) }
          : {}),
      };
      if (mode === 'origin') {
        return {
          ...row,
          ...base,
          createdAt: fmtBy(row.createdAt, 'yyyy-MM-dd HH:mm'),
        };
      }
      return {
        path: row.routePath,
        name: row.menuName,
        meta: {
          icon: row.icon,
          title: row.menuName,
        },
        component: row.component,
        redirect: row.redirect,
        ...base,
      };
    });
  }

  /**
   * 用户登录后，获取有权限的菜单，不包含按钮
   */
  async permList(user: AuthSession) {
    const permCodes = await this.accountService.getPermCode(user);
    const list = await this.prisma.sysMenu.findMany({
      where: { parentMenuId: null, show: '0' },
      orderBy: { orderNo: 'asc' },
    });
    const others = await this.prisma.sysMenu.findMany({
      where: {
        parentMenuId: { not: null },
        permission: { in: permCodes },
        type: { not: SysMenuType.btn },
      },
      orderBy: { orderNo: 'asc' },
    });
    const otherGroups = groupBy(others, 'parentMenuId');
    return this.buildTree('perm', list, otherGroups);
  }

  /**
   * 权限管理、菜单管理 获取权限树 时调用
   */
  async list() {
    const list = await this.prisma.sysMenu.findMany({
      where: { parentMenuId: null },
      orderBy: { orderNo: 'asc' },
    });
    const others = await this.prisma.sysMenu.findMany({
      where: {
        parentMenuId: { not: null },
      },
      orderBy: { orderNo: 'asc' },
    });
    const otherGroups = groupBy(others, 'parentMenuId');
    return this.buildTree('origin', list, otherGroups);
  }

  async create(data: Prisma.SysMenuCreateInput) {
    return this.prisma.sysMenu.create({
      data,
    });
  }

  async update(id: string, data: Prisma.SysMenuUpdateInput) {
    return this.prisma.sysMenu.update({
      where: { id },
      data: { ...data, orderNo: Number(data.orderNo) },
    });
  }
}
