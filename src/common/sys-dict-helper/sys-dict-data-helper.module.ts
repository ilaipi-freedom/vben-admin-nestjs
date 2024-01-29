import { Module } from '@nestjs/common';

import { SysDictHelperService } from './sys-dict-data-helper.service';

@Module({
  providers: [SysDictHelperService],
  exports: [SysDictHelperService],
})
export class SysDictHelperModule {}
