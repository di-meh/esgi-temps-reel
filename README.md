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
npx prisma db push && npx prisma db seed
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

