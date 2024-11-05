import prisma from "../src/config/databaseConnection"
import bcrypt from "bcrypt";

const main = async () => {
  const password = bcrypt.hashSync("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password,
      role: "admin",
    },
  });

  const profile = await prisma.profile.create({
    data: {
      userId: admin.id,
      name: "Admin",
      job: "Admin",
      birthDate: new Date("2024-01-01"),
      birthPlace: "Makassar",
      address: "Address",
    }
  });

  console.log(profile, admin);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });