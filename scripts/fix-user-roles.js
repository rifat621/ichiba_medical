const { PrismaClient } = require("@prisma/client");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Gunakan raw SQL untuk update karena Prisma Client sudah di-generate dengan enum baru
async function main() {
  const dbPath = path.join(__dirname, "..", "prisma", "dev.db");
  
  if (!fs.existsSync(dbPath)) {
    console.log("Database not found. Creating new admin user...");
    // Generate Prisma Client dulu
    execSync("npx prisma generate", { stdio: "inherit", cwd: path.join(__dirname, "..") });
    
    const { PrismaClient: NewPrismaClient } = require("@prisma/client");
    const prisma = new NewPrismaClient();
    
    // Create admin user
    const bcrypt = require("bcryptjs");
    const hash = await bcrypt.hash("admin123", 10);
    
    await prisma.user.upsert({
      where: { username: "adminichiba" },
      update: {
        name: "Admin Ichiba",
        password: hash,
        role: "ADMIN",
      },
      create: {
        name: "Admin Ichiba",
        username: "adminichiba",
        password: hash,
        role: "ADMIN",
      },
    });
    
    console.log("✅ Admin user created: adminichiba");
    await prisma.$disconnect();
    return;
  }

  // Update existing users dengan raw SQL
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database(dbPath);

  return new Promise((resolve, reject) => {
    // Update SUPER_ADMIN -> ADMIN
    db.run(
      "UPDATE User SET role = 'ADMIN' WHERE role = 'SUPER_ADMIN'",
      function(err) {
        if (err) {
          console.error("Error updating SUPER_ADMIN:", err);
          reject(err);
          return;
        }
        console.log(`✅ Updated ${this.changes} SUPER_ADMIN user(s) to ADMIN`);
        
        // Update TECHNICIAN -> STAFF
        db.run(
          "UPDATE User SET role = 'STAFF' WHERE role = 'TECHNICIAN'",
          function(err2) {
            if (err2) {
              console.error("Error updating TECHNICIAN:", err2);
              reject(err2);
              return;
            }
            console.log(`✅ Updated ${this.changes} TECHNICIAN user(s) to STAFF`);
            
            // List semua users
            db.all("SELECT id, username, name, role FROM User", (err3, rows) => {
              if (err3) {
                reject(err3);
                return;
              }
              
              console.log("\n📋 Current users:");
              rows.forEach((u) => {
                console.log(`  - ${u.username} (${u.name}) - Role: ${u.role}`);
              });
              
              db.close();
              resolve();
            });
          }
        );
      }
    );
  });
}

main()
  .then(() => {
    console.log("\n✅ Role update completed!");
    // Regenerate Prisma Client
    console.log("Regenerating Prisma Client...");
    execSync("npx prisma generate", { stdio: "inherit", cwd: path.join(__dirname, "..") });
  })
  .catch(console.error);
