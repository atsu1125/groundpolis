FROM node:15.14.0-buster AS builder

ENV NODE_ENV=production

WORKDIR /misskey

RUN apt-get update
RUN apt-get install -y build-essential

RUN git init
RUN git submodule update --init
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn add npm-run-all --dev
COPY . ./
RUN yarn build

FROM node:15.14.0-buster-slim AS runner

ENV NODE_ENV=production
WORKDIR /misskey

RUN npm i -g web-push

RUN apt-get update
RUN apt-get install -y ffmpeg

COPY --from=builder /misskey/node_modules ./node_modules
COPY --from=builder /misskey/built ./built
COPY . ./

CMD ["npm", "run", "migrateandstart"]
