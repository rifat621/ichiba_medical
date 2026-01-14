# Setup Database - Panduan Lengkap

## Error: Can't reach database server at `localhost:3306`

Error ini terjadi karena Prisma tidak bisa terhubung ke MySQL server. Ikuti langkah-langkah berikut:

## Langkah 1: Pastikan MySQL Server Berjalan

### Windows (XAMPP/WAMP):
1. Buka **XAMPP Control Panel** atau **WAMP**
2. Pastikan **MySQL** service berjalan (status hijau)
3. Jika belum berjalan, klik **Start** pada MySQL

### Windows (MySQL Service):
```powershell
# Cek status MySQL service
Get-Service -Name MySQL*

# Start MySQL service (jika belum berjalan)
Start-Service -Name MySQL80
# atau
net start MySQL80
```

### Alternatif: Cek dengan MySQL Command Line
```bash
mysql -u root -p
```

## Langkah 2: Buat Database

Buka MySQL (via phpMyAdmin atau command line) dan buat database:

```sql
CREATE DATABASE ichiba_medical CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Atau via phpMyAdmin:
1. Buka http://localhost/phpmyadmin
2. Klik "New" di sidebar kiri
3. Database name: `ichiba_medical`
4. Collation: `utf8mb4_unicode_ci`
5. Klik "Create"

## Langkah 3: Buat File .env

1. Copy file `.env.example` menjadi `.env`:
```bash
copy .env.example .env
```

2. Edit file `.env` dan sesuaikan dengan konfigurasi MySQL Anda:

### Untuk XAMPP (default - tanpa password):
```env
DATABASE_URL="mysql://root:@localhost:3306/ichiba_medical"
```

### Untuk MySQL dengan password:
```env
DATABASE_URL="mysql://root:yourpassword@localhost:3306/ichiba_medical"
```

### Format DATABASE_URL:
```
mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
```

**Contoh:**
- Username: `root`
- Password: `mypassword123`
- Host: `localhost`
- Port: `3306`
- Database: `ichiba_medical`

Maka DATABASE_URL:
```env
DATABASE_URL="mysql://root:mypassword123@localhost:3306/ichiba_medical"
```

## Langkah 4: Test Koneksi Database

Cek apakah koneksi berhasil:

```bash
# Test dengan Prisma
npx prisma db pull

# Atau test langsung dengan MySQL client
mysql -u root -p -e "USE ichiba_medical; SHOW TABLES;"
```

## Langkah 5: Jalankan Migration

Setelah database dibuat dan .env dikonfigurasi:

```bash
# Generate Prisma Client
npx prisma generate

# Jalankan migration
npx prisma migrate dev --name init

# Atau jika sudah ada migration sebelumnya
npx prisma migrate deploy
```

## Troubleshooting

### Error: Access denied for user
- Pastikan username dan password di `.env` benar
- Cek apakah user MySQL memiliki akses ke database

### Error: Unknown database 'ichiba_medical'
- Database belum dibuat, ikuti Langkah 2

### Error: Can't reach database server
- Pastikan MySQL service berjalan
- Cek port MySQL (default 3306)
- Cek firewall tidak memblokir koneksi

### Port MySQL Berbeda
Jika MySQL menggunakan port selain 3306, ubah di `.env`:
```env
DATABASE_URL="mysql://root:password@localhost:3307/ichiba_medical"
```

### Menggunakan MariaDB
Jika menggunakan MariaDB, tetap gunakan provider `mysql` di Prisma:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

## Alternatif: Menggunakan SQLite (Development)

Jika MySQL sulit di-setup, bisa menggunakan SQLite untuk development:

1. Ubah `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

2. Ubah semua `@db.Text` menjadi `String` di schema
3. Jalankan migration:
```bash
npx prisma migrate dev
```

**Catatan:** SQLite hanya untuk development. Untuk production tetap gunakan MySQL.
