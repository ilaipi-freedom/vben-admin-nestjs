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

## cli-helper

使用方法：

```
# 第一个参数是 nest module 名字，第二个是 src/apps/ 下面的文件夹名字
# 创建： mo co s，然后把文件夹从 src 下面移动到 src/apps/admin 下面
.\cli-helper.bat test admin
```
