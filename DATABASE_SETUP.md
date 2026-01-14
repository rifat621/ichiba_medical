# Setup Database - Quick Guide

## ✅ Database Sudah Dikonfigurasi dengan SQLite

Aplikasi sekarang menggunakan **SQLite** untuk development, yang lebih mudah karena tidak perlu install MySQL server.

### File Database
- Database file: `prisma/dev.db` (akan dibuat otomatis setelah migration)

## Membuat User Admin Pertama

Jalankan script untuk membuat super admin:

```bash
node scripts/create-superadmin.js
```

**Credentials:**
- Username: `superadminichiba`
- Password: `admin123`

## Menggunakan MySQL (Opsional)

Jika ingin menggunakan MySQL untuk production:

1. **Install & Start MySQL:**
   - XAMPP: Start MySQL di XAMPP Control Panel
   - Atau install MySQL Server

2. **Buat Database:**
   ```sql
   CREATE DATABASE ichiba_medical CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Update `prisma/schema.prisma`:**
   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }
   ```
   
   Dan ubah:
   ```prisma
   fault         String   @db.Text
   analysis      String   @db.Text
   ```

4. **Update `.env`:**
   ```env
   DATABASE_URL="mysql://root:password@localhost:3306/ichiba_medical"
   ```

5. **Hapus migration lama dan buat baru:**
   ```bash
   Remove-Item -Path "prisma\migrations" -Recurse -Force
   npx prisma migrate dev --name init
   ```

## Commands Berguna

```bash
# Generate Prisma Client (setelah perubahan schema)
npx prisma generate

# Jalankan migration
npx prisma migrate dev

# Lihat database di Prisma Studio (GUI)
npx prisma studio

# Reset database (hapus semua data)
npx prisma migrate reset
```

## Troubleshooting

### Error: Can't reach database server
- **SQLite:** Pastikan folder `prisma` bisa di-write
- **MySQL:** Pastikan MySQL service berjalan dan database sudah dibuat

### Error: Migration provider mismatch
- Hapus folder `prisma/migrations` dan jalankan migration baru

### Error: Prisma Client out of sync
- Jalankan: `npx prisma generate`
