import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });

  console.log(users);
} catch (error) {
  console.error("Erro:", error);
} finally {
  await prisma.$disconnect();
}