# STAGE: Development
FROM node:14-alpine3.13 AS dev
RUN apk update && apk add bash && apk add make && apk add python3
EXPOSE 3000
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . /app/
CMD ["npm", "run", "start:dev"]


# # STAGE: Migrate common
FROM dev AS migrate_db 
ARG DATABASE_URL 
ENV DATABASE_URL $DATABASE_URL
WORKDIR /app
CMD ["make", "migrate_db"]

