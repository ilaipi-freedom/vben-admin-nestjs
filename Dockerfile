FROM node:18.16.1-alpine3.17 as base

WORKDIR /app

FROM base as prod

COPY package*.json ./

RUN npm install --omit=dev
RUN rm -fr /app/node_modules/.prisma

FROM base as dev

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

FROM dev as build
COPY . ./
RUN npx prisma generate
RUN npm run build

FROM base as release

COPY --from=prod /app/node_modules /app/node_modules/
COPY --from=build /app/node_modules/.prisma/ /app/node_modules/.prisma/
COPY package.json ./
COPY prisma ./prisma/
COPY --from=build /app/dist /app/dist/

ENTRYPOINT ["node"]

CMD ["dist/main.js"]
