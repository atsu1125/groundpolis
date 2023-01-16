FROM node:16.18.1-bullseye AS builder

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
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile
COPY . ./
RUN pnpm build

FROM node:16.18.1-bullseye-slim AS runner

ENV NODE_ENV=production
WORKDIR /misskey

RUN corepack enable pnpm

RUN apt-get update
RUN apt-get install -y ffmpeg wget

COPY --from=builder /misskey/node_modules ./node_modules
COPY --from=builder /misskey/built ./built
COPY . ./

CMD ["pnpm", "run", "migrateandstart"]
