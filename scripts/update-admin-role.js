const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Update user dengan username superadminichiba menjadi ADMIN
  const admin = await prisma.user.updateMany({
    where: {
      username: "superadminichiba",
    },
    data: {
      role: "ADMIN",
    },
  });

  console.log(`✅ Updated ${admin.count} admin user(s)`);
  
  // List semua users untuk verifikasi
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
    },
  });

  console.log("\n📋 Current users:");
  users.forEach((u) => {
    console.log(`  - ${u.username} (${u.name}) - Role: ${u.role}`);
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
