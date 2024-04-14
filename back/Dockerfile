# Get NPM packages
FROM node:21.5.0-alpine3.18 as dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
COPY .npmrc ./
RUN npm i

# Rebuild the source code only when needed
FROM node:21.5.0-alpine3.18 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run the app
FROM node:21.5.0-alpine3.18 as runner
WORKDIR /app

ENV NODE_ENV production
ENV TYPEORM_CONNECTION postgres
ENV TYPEORM_HOST /cloudsql/involuted-reach-417818:us-central1:saude-digital-db
ENV TYPEORM_PORT 5432
ENV TYPEORM_USERNAME postgres
ENV TYPEORM_PASSWORD "o+Ug,+#\enTF5#gN"
ENV TYPEORM_DATABASE patient_db
ENV TYPEORM_SYNCHRONIZE false
ENV TYPEORM_ENTITIES dist/core/components/**/entity.js
ENV TYPEORM_MIGRATIONS dist/core/db/migrations/**/*.js

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./package.json
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]
