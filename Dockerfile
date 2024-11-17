FROM node:22-alpine AS api-service
WORKDIR /app
COPY . /app/
RUN npm -g install pnpm@8.15.3
RUN pnpm install
RUN pnpm run build