import { Module } from '@nestjs/common';
import { CacheModule as Cache } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';

@Module({
  imports: [
    Cache.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        isGlobal: true,
        ...configService.get('env.cache'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [Cache],
})
export class CacheModule {}
