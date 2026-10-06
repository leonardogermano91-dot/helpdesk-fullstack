import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const email = "tecnico2@helpdesk.com";
const newPassword = "123456";

try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await prisma.user.update({
        where: { email },
        data: {
            password: hashedPassword
        }
    });

    console.log("Senha redefinida com sucesso!");
  console.log("Usuário:", user.email);
console.log("ID:", user.id);
console.log("Role:", user.role);
} catch (error) {
    console.error("Erro ao redefinir senha:", error);
} finally {
    await prisma.$disconnect();
}