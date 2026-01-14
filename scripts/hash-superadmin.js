import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const username = "superadminichiba"; // pastikan sama persis dengan Prisma Studio
  const plainPassword = "admin123";

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    console.log("❌ User tidak ditemukan. Cek username di Prisma Studio:", username);
    const all = await prisma.user.findMany({ select: { id: true, username: true, role: true } });
    console.log("📌 Daftar user yang ada:", all);
    return;
  }

  const hash = await bcrypt.hash(plainPassword, 10);

  await prisma.user.update({
    where: { username },
    data: { password: hash },
  });

  console.log("✅ Password Super Admin berhasil di-hash untuk:", username);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
