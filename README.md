## dev

```shell
npx prisma db push // 根据 schema.prisma 自动生成数据库表

npx nest start --watch
```

## production

```
docker build -t tianzhi-backend:1.0 .

docker run -dit --name tianzhi-backend --env-file .env tianzhi-backend:1.0
```
