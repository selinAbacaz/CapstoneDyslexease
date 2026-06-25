ARG NODE_VERSION=24.11.1

#Base
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app

# Prune Stage
FROM base as perpare

RUN npm install -g turbo

COPY . .

RUN turbo prune api --docker

# Build Stage
FROM base as builder

COPY --from=perpare /app/out/json .
RUN npm ci 

COPY --from=perpare /app/out/full .
RUN npm run build

#Runtime
FROM base as runner
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=builder /app .

EXPOSE 3001

CMD node apps/api/dist/main.js
