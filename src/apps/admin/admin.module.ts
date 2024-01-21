import { Module } from '@nestjs/common';

import { AccountModule } from './account/account.module';
import { SysMenuModule } from './sys-menu/sys-menu.module';

@Module({
  imports: [AccountModule, SysMenuModule],
})
export class AdminApiModule {}
