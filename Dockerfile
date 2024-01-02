FROM node:20

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY nscacert_combined.pem ./certs

ENV NODE_TLS_REJECT_UNAUTHORIZED=0 # Remove for Production
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma/schema.prisma ./prisma/
RUN pnpx prisma generate



COPY . .

EXPOSE 8080
CMD [ "pnpm", "start" ]