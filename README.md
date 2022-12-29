# Web Temps Reel

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, copy the .env.example file into a .env file and fill the variables.

Then, run the development server:

```bash
docker compose build --pull --no-cache
# and then
docker compose up -d
```

## Database

The project uses [Prisma](https://www.prisma.io/) to manage the database.

To create the database, run the following command:

```bash
docker compose exec app npx prisma db push
docker compose exec app npx prisma db seed
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
