import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { getRuntimeModule } from '../utils/app.helper';
import { CacheModule } from '../common/cache/cache.module';
import { AuthModule } from '../common/auth/auth.module';
import { JwtAuthGuard } from '../common/auth/auth.guard';
import { HttpExceptionFilter } from '../common/helpers/http-exception.filter';
import { GlobalHelperModule } from './global-helper/global-helper.module';

const { module: runtimeModule, bootstrap } = getRuntimeModule();

@Module({
  imports: [GlobalHelperModule, AuthModule, CacheModule, runtimeModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

export { bootstrap };
