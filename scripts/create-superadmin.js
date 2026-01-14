import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = "superadminichiba";
  const password = "admin123";

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { username },
    update: {
      name: "Admin Ichiba",
      password: hash,
      role: "ADMIN",
    },
    create: {
      name: "Admin Ichiba",
      username,
      password: hash,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin siap:", user.username);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
