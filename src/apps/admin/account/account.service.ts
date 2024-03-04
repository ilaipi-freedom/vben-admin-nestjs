import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Account, AvailableStatus, Prisma, SysMenuType } from '@prisma/client';
import { map } from 'lodash';
import * as argon2 from 'argon2';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthSession } from 'src/types/auth';
import { ResetPasswordDto } from './dto';
import { fmtBy } from 'src/common/helpers/date-helper';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);
  constructor(private readonly prisma: PrismaService) {}

  async getAccountInfo(user: AuthSession) {
    const account = await this.prisma.account.findUnique({
      where: { id: user.id },
      select: {
        name: true,
        phone: true,
        remark: true,
        role: {
          select: {
            name: true,
            perm: true,
            route: true,
            remark: true,
          },
        },
        dept: {
          select: {
            name: true,
            remark: true,
          },
        },
      },
    });
    return account;
  }

  async getPermCode(user: AuthSession) {
    const account = await this.prisma.account.findUnique({
      where: { id: user.id },
    });
    if (!account?.roleId) {
      this.logger.log({ user, account }, '用户不存在或未配置角色');
      throw new HttpException(
        '用户状态异常，请联系管理员',
        HttpStatus.BAD_REQUEST,
      );
    }
    const list = await this.prisma.roleMenuConfig.findMany({
      where: {
        roleId: account.roleId,
        sysMenu: {
          type: { not: SysMenuType.dir },
        },
      },
      include: {
        sysMenu: {
          select: {
            permission: true,
            type: true,
          },
        },
      },
    });
    return map(list, 'sysMenu.permission');
  }

  async getPermCodeByRole(roleId: string) {
    const list = await this.prisma.roleMenuConfig.findMany({
      where: {
        roleId: roleId,
      },
      include: {
        sysMenu: {
          select: {
            id: true,
            permission: true,
            type: true,
          },
        },
      },
    });
    return map(list, 'sysMenu.id');
  }

  async create(data: Prisma.AccountCreateInput) {
    const password = await argon2.hash(data.password);
    return this.prisma.account.create({ data: { ...data, password } });
  }

  async resetPassword(id: string, payload: ResetPasswordDto) {
    const password = await argon2.hash(payload.password);
    return this.prisma.account.update({
      where: { id },
      data: { password },
      select: {
        id: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.account.delete({ where: { id } });
  }

  async update(id: string, data: Prisma.AccountCreateInput) {
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }
    return this.prisma.account.update({
      where: { id },
      data,
      select: {
        id: true,
      },
    });
  }
  async list(
    query: {
      q?: string;
      status?: AvailableStatus;
      date?: string[];
    },
    page = 1,
    limit = 30,
  ) {
    const where: Prisma.AccountWhereInput = {};
    if (query.q) {
      where.username = { contains: query.q };
    }
    const total = await this.prisma.account.count({ where });
    const list = await this.prisma.account.findMany({
      where,
      select: {
        id: true,
        username: true,
        name: true,
        phone: true,
        status: true,
        roleId: true,
        createdAt: true,
        remark: true,
        role: {
          select: {
            name: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: Number(limit),
    });
    return {
      total,
      list: list.map((row: any) => ({
        ...row,
        createdAt: fmtBy(row.createdAt, 'yyyy-MM-dd'),
      })),
    };
  }

  async getById(id: string) {
    const result = await this.prisma.account.findUnique({
      where: { id },
      select: {
        id: true,
        roleId: true,
        username: true,
        password: true,
        name: true,
        phone: true,
        status: true,
      },
    });
    return result;
  }
}
