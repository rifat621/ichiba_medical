This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MySQL database
- Environment variables configured (see `.env` file)

### Setup Database

1. Create a `.env` file in the root directory:
```env
DATABASE_URL="mysql://user:password@localhost:3306/ichiba_medical"
```

2. Run Prisma migrations to create database tables:
```bash
npx prisma migrate dev
```

3. Generate Prisma Client:
```bash
npx prisma generate
```

4. (Optional) Create a super admin account using the script:
```bash
node scripts/create-superadmin.js
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend API Endpoints

### Authentication
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `POST /api/hospitals` - Create new hospital

### Service Reports
- `GET /api/service-reports` - Get all service reports
- `POST /api/service-reports` - Create new service report
- `GET /api/service-reports/[id]` - Get service report by ID

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
