import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SysMenuType } from '@prisma/client';
import { map } from 'lodash';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthSession } from 'src/types/auth';

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
}
