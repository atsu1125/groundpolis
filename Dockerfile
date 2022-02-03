FROM node:15.14.0-buster AS base

ENV NODE_ENV=production

WORKDIR /misskey

FROM base AS builder

RUN apt-get update
RUN apt-get install \
    autoconf \
    automake \
    file \
		git \
    g++ \
    gcc \
    libc-dev \
    libtool \
    make \
    nasm \
    pkgconfig \
    python \
    zlib-dev

RUN git init
RUN git submodule update --init
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn add npm-run-all --dev
COPY . ./
RUN yarn build

FROM base AS runner

RUN apt-get update
RUN apt-get install \
    libav-tools \
    tini
RUN rm -rf /var/cache/apt
RUN npm i -g web-push
ENTRYPOINT ["/sbin/tini", "--"]

COPY --from=builder /misskey/node_modules ./node_modules
COPY --from=builder /misskey/built ./built
COPY . ./

CMD ["npm", "run", "migrateandstart"]
