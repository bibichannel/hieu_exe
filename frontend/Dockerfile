# build environment
FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json /app/package.json

RUN pnpm i

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
