export default () => {
  const redisPass = process.env.REDIS_PASS;
  const redis = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    db: process.env.REDIS_DB || 0,
    ...(redisPass ? { password: redisPass } : {}),
  };
  const env = {
    appPort: process.env.APP_PORT || 6000,
    appInstance: process.env.APP_INSTANCE || 'App',
    isProduction: process.env.NODE_ENV === 'production',
    appDeployment: process.env.APP_DEPLOYMENT,
    jwt: {
      secret: process.env.APP_JWT_SECRET,
    },
    redis,
    cache: {
      ...redis,
      ttl: 60001, // 默认缓存1分钟
    },
    huajuan: {
      apiServer: 'https://app.openapi.dhcc.wang',
      appId: process.env.HUAJUAN_APP_ID,
      appSecret: process.env.HUAJUAN_APP_SECRET,
    },
  };
  return { env };
};
