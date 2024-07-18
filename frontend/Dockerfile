# build environment
FROM node:20-alpine

WORKDIR /app

ENV NODE_OPTIONS=--max_old_space_size=2048

COPY package.json /app/package.json

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
