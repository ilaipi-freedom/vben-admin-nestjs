import { ConfigService } from '@nestjs/config';

import { AdminApiModule } from 'src/apps/admin/admin.module';
import { AppInstanceEnum } from '../types/helper';

const getRuntimeModule = () => {
  switch (process.env.APP_INSTANCE) {
    case AppInstanceEnum.ADMIN:
      return { module: AdminApiModule };
    default:
      return { bootstrap: () => console.log('custom bootstrap') };
  }
};

const isProd = (config: ConfigService) => {
  const deployment = config.get('env.appDeployment');
  return deployment === 'prod';
};

export { getRuntimeModule, isProd };
