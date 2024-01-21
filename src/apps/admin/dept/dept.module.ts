import { Module } from '@nestjs/common';

import { DeptController } from './dept.controller';
import { DeptService } from './dept.service';

@Module({
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule {}
