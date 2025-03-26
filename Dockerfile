FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

# Add a script to run migrations before starting the app
CMD ["/bin/sh", "-c", "npx prisma migrate deploy && npm run start:dev"]