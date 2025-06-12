# Prisma

https://www.prisma.io/


## Prisma CLI

```bash
$ prisma [command]
            init   Set up Prisma for your app
        generate   Generate artifacts (e.g. Prisma Client)       [*]
              db   Manage your database schema and lifecycle     [*]
         migrate   Migrate your database                         [*]
          studio   Browse your data with Prisma Studio           [*]
        validate   Validate your Prisma schema
          format   Format your Prisma schema
         version   Displays Prisma version info
           debug   Displays Prisma debug info
             mcp   Starts an MCP server to use with AI development tools

```

`npx prisma migrate --help`

```bash
# Commands for development
dev    Create a migration from changes in Prisma schema, apply it to the database, trigger generators (Prisma Client)
reset  Reset your database and apply all migrations, all data will be lost

# Commands for production/staging
deploy   Apply pending migrations to the database 
status   Check the status of your database migrations
resolve  Resolve issues with database migrations, i.e. baseline, failed migration, hotfix
```

`npx prisma db --help` 

```bash
# Manage your database schema and lifecycle during development
pull   Pull the state from the database to the Prisma schema using introspection
push   Push the state from Prisma schema to the database during prototyping
seed   Seed your database
```

`npx prisma studio`

Provide a web-based GUI that lets you visually explore and manage the data in your database.

This command:
  * Launches Prisma Studio on a local URL (usually http://localhost:5555)
  * Uses the database connection defined in your prisma/schema.prisma


## Workflow

### Development Workflow

1. Install Prisma and Initialize (only once) `npx install @prisma/client && npx prisma init`
  * This creates `prisma/schema.prisma`, and sets up your environment
2. Define your data models in `schema.prisma`
3. Run migrations to update your local database `npx prisma migrate dev --name <name-of-migration>`
  * This create a new migration and runs it, and also generates the client
  * 如果不需要 migration 文件跟踪，那么可以手动执行 SQL 更新数据库 + `npx prisma generate` 更新 Prisma Client
4. Use Prisma Client in your code `const prisma = new PrismaClient()`
5. Inspect and edit data during dev `npx prisma studio`
6. Optional: Reset DB during dev (if needed) `npx prisma migrate reset`

### Production Deployment Workflow

1. Push schema to DB (根据习惯3选一)
  * `npx prisma db push` Use this if you're not relying on migrations in production
  * `npx prisma migrate deploy` Use this if you're using `migrate dev` locally
  * 把变更用的 SQL 发给 DBA 手动执行
2. Generate Prisma Client in CICD


## Prisma Postgres Quick Start

https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-prismaPostgres

### Connect your database

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

### Using Prisma Migrate

Add the following data model to your Prisma schema in `prisma/schema.prisma`.

```
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

Map your data model to the database schema `npx prisma migrate dev --name init`. This command does two things:
* It creates a new SQL migration file for this migration
* It runs the SQL migration file against the database

Whenever you update your prisma schema, you will have to update your database schema using either `npx prisma db push` or `npx prisma migrate dev`. These commands serve different purposes in managing your database schema with Prisma. Here’s a breakdown of when and why to use each:

`npx prisma migrate dev`
* Purpose: This command generates and applies a new migration based on your Prisma schema changes. It creates migration files that keep a history of changes.
* Use Case: Use this when you want to maintain a record of database changes, which is essential for production environments or when working in teams. It allows for version control of your database schema.
* Benefits: This command also includes checks for applying migrations in a controlled manner, ensuring data integrity.

`npx prisma db push`
* Purpose: This command is used to push your current Prisma schema to the database directly. It applies any changes you've made to your schema without creating migration files.
* Use Case: It’s particularly useful during the development phase when you want to quickly sync your database schema with your Prisma schema without worrying about migration history.
* Caution: It can overwrite data if your schema changes affect existing tables or columns, so it’s best for early-stage development or prototyping.




## Prisma MongoDB

2021 Prisma VS Mongoose https://github.com/prisma/prisma/discussions/9076

Mongoose 起步早、成熟，Prisma 是新流行的 Node.js ORM 库，对 MongoDB 的支持还不太成熟。








