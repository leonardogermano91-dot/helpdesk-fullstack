import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const email = "admin@helpdesk.com";
const newPassword = "123456";

try {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword
    }
  });

  console.log("Senha do ADMIN redefinida com sucesso!");
  console.log("Usuário:", user.email);
  console.log("ID:", user.id);
  console.log("Role:", user.role);
} catch (error) {
  console.error("Erro:", error);
} finally {
  await prisma.$disconnect();
}