FROM node:18.10.0-alpine3.16 AS builder

RUN apk add --no-cache curl bash \
  && curl -sf https://gobinaries.com/tj/node-prune | sh

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run db:gen \
  && npm run build \
  && npm run generate:swagger \
  && npm prune --production \
  && node-prune

FROM node:18.10.0-alpine3.16
USER node:node
WORKDIR /usr/src/app

COPY --from=builder --chown=node:node /usr/src/app/dist ./dist
COPY --from=builder --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/src/app/package.json ./package.json
COPY --from=builder --chown=node:node /usr/src/app/swagger.json ./swagger.json

ENV NODE_ENV=production

CMD [ "npm", "run", "serve" ]