# Todo App Setup

## 🐳 Docker Setup (Recommended)

The easiest way to run this app is with Docker - no local database or environment setup needed!

# Todo App Setup

## 🐳 Docker Setup (Recommended)

The easiest way to run this app is with Docker - no local database or environment setup needed!

1. **Install Docker Desktop**

2. **Start the app**:

   ```bash
   docker compose up -d
   ```

   This will:

   - Pull PostgreSQL image
   - Build the app image
   - Run database migrations automatically
   - Start both containers

3. **Access the App**:
   Open `http://localhost:3000` in your browser

4. **Useful Docker Commands**:
   - Build + start: `npm run docker:up`
   - Stop + remove: `npm run docker:down`
   - View logs: `npm run docker:logs`
   - Rebuild only: `npm run docker:build`
   - List services: `npm run docker:ps`
   - Access database: `docker exec -it todo_db psql -U postgres -d todoapp`
   - Clean up unused: `docker system prune`

The app waits for Postgres to be ready and applies migrations automatically before starting.

---

## 💻 Local Development Setup

If you want to run the app locally without Docker:

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure:

   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: A secure random string
   - `PORT`: App port (default: 3000)

3. **Set up PostgreSQL database**:

   - Install PostgreSQL locally, OR
   - Run just the DB in Docker:
     ```bash
     docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=todoapp postgres:15-alpine
     ```
   - Update `DATABASE_URL` in `.env` accordingly

4. **Run database migrations**:

   ```bash
   npx prisma migrate deploy
   ```

5. **Build and start the app**:

   ```bash
   npm run build
   npm start
   ```

6. **Access the App**:
   Open `http://localhost:3000` in your browser

---

## 📝 Development Commands

- Generate Prisma Client: `npx prisma generate`
- Create new migration: `npx prisma migrate dev --name your_migration_name`
- Open Prisma Studio: `npx prisma studio`
- Build TypeScript: `npm run build`
