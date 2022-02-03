FROM node:15.14.0-buster AS builder

ENV NODE_ENV=production

WORKDIR /misskey

RUN apt-get update
RUN apt-get install -y build-essential
RUN wget https://github.com/jcupitt/libvips/archive/refs/tags/v8.11.2.tar.gz
RUN tar xf v8.11.2.tar.gz && cd libvips-8.11.2 && sh autogen.sh &&make && make install && ldconfig

RUN git init
RUN git submodule update --init
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn add npm-run-all --dev
COPY . ./
RUN yarn build

FROM node:15.14.0-buster-slim AS runner

RUN apt-get update
RUN apt-get install -y \
    ffmpeg \
    tini
RUN npm i -g web-push
ENTRYPOINT ["/sbin/tini", "--"]

COPY --from=builder /misskey/node_modules ./node_modules
COPY --from=builder /misskey/built ./built
COPY . ./

CMD ["npm", "run", "migrateandstart"]
