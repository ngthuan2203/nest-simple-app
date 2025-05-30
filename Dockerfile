FROM node:21-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock  ./
RUN yarn install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables must be present at build time
ENV NODE_ENV production

RUN yarn build

EXPOSE 3500
RUN rm -rf node_modules && yarn install --production && yarn cache clean

# Production image, copy all the files and run next
FROM base AS runner
ARG ENV_CONFIGURATION
WORKDIR /app

ENV NODE_ENV production
ENV NODE_OPTIONS=--max-old-space-size=1700

# Copy code output and node_modules prod from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

CMD [ "node", "dist/main.js" ]
