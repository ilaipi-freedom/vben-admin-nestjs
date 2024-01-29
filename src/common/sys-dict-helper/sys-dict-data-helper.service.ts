import { Injectable } from '@nestjs/common';
import { AvailableStatus } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SysDictHelperService {
  constructor(private readonly prisma: PrismaService) {}
  async getTypeValues(type: string) {
    return this.prisma.sysDictData.findMany({
      where: { type, status: AvailableStatus.normal },
      orderBy: { sort: 'asc' },
    });
  }
  async getSingleData(type: string) {
    return this.prisma.sysDictData.findFirst({
      where: { type, status: AvailableStatus.normal },
      orderBy: { sort: 'asc' },
    });
  }

  async getByTypeAndValue(type: string, value: string) {
    return this.prisma.sysDictData.findFirst({
      where: { type, value, status: AvailableStatus.normal },
      orderBy: { sort: 'asc' },
    });
  }
}
