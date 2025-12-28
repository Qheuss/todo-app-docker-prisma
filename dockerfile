FROM node:24-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ARG DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate && npx tsc -p tsconfig.gen.json && npm run build

EXPOSE 3000

CMD ["sh", "-c", "until npx prisma migrate deploy; do echo 'Waiting for DB...'; sleep 2; done; node dist/src/server.js"]