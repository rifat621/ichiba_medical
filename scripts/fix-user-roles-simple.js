const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // Update role menggunakan raw SQL karena enum sudah berubah
    // Update SUPER_ADMIN -> ADMIN
    await prisma.$executeRaw`UPDATE User SET role = 'ADMIN' WHERE role = 'SUPER_ADMIN'`;
    console.log("✅ Updated SUPER_ADMIN users to ADMIN");
    
    // Update TECHNICIAN -> STAFF  
    await prisma.$executeRaw`UPDATE User SET role = 'STAFF' WHERE role = 'TECHNICIAN'`;
    console.log("✅ Updated TECHNICIAN users to STAFF");
    
    // List semua users
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
    
    console.log("\n✅ Role update completed!");
  } catch (error) {
    console.error("Error:", error.message);
    // Jika error karena enum, regenerate Prisma Client dulu
    if (error.message.includes("not found in enum")) {
      console.log("\n⚠️  Regenerating Prisma Client...");
      const { execSync } = require("child_process");
      execSync("npx prisma generate", { stdio: "inherit" });
      console.log("✅ Please run this script again.");
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
