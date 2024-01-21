import { Module } from '@nestjs/common';

import { AccountModule } from './account/account.module';
import { SysMenuModule } from './sys-menu/sys-menu.module';
import { RoleModule } from './role/role.module';
import { SysDictModule } from './sys-dict/sys-dict.module';
import { SysDictDataModule } from './sys-dict-data/sys-dict-data.module';

@Module({
  imports: [
    AccountModule,
    SysMenuModule,
    RoleModule,
    SysDictModule,
    SysDictDataModule,
  ],
})
export class AdminApiModule {}
