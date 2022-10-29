FROM node:16.17.1-bullseye AS builder

ENV NODE_ENV=production

WORKDIR /misskey

RUN apt-get update
RUN apt-get install -y build-essential \
                       autoconf \
                       automake \
                       file \
                       g++ \
                       gcc \
                       libtool \
                       nasm \
                       pkg-config \
                       python \
                       zlib1g-dev

RUN git init
RUN git submodule update --init
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 100000
RUN yarn add npm-run-all --dev
COPY . ./
RUN yarn build

FROM node:16.17.1-bullseye-slim AS runner

ENV NODE_ENV=production
WORKDIR /misskey

RUN npm i -g web-push

RUN apt-get update
RUN apt-get install -y ffmpeg wget

COPY --from=builder /misskey/node_modules ./node_modules
COPY --from=builder /misskey/built ./built
COPY . ./

CMD ["npm", "run", "migrateandstart"]
