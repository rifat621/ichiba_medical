const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const username = "superadminichiba";
  const plainPassword = "admin123";

  const hash = await bcrypt.hash(plainPassword, 10);

  await prisma.user.update({
    where: { username },
    data: { password: hash },
  });

  console.log("✅ Password Super Admin berhasil di-hash");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
