import { Module } from '@nestjs/common';

import { SysDictDataController } from './sys-dict-data.controller';
import { SysDictDataService } from './sys-dict-data.service';

@Module({
  controllers: [SysDictDataController],
  providers: [SysDictDataService],
})
export class SysDictDataModule {}
