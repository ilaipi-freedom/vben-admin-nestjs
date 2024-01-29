import { Module } from '@nestjs/common';

import { SysMenuController } from './sys-menu.controller';
import { SysMenuService } from './sys-menu.service';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [AccountModule],
  controllers: [SysMenuController],
  providers: [SysMenuService],
})
export class SysMenuModule {}
