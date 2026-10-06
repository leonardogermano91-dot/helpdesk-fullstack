import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const email = "admin@helpdesk.com";
const novaSenha = "Admin@123";

const senhaHash = await bcrypt.hash(novaSenha, 10);

const user = await prisma.user.update({
    where: { email },
    data: {
        password: senhaHash,
        role: "ADMIN"
    }
});

console.log(`Senha do ADMIN atualizada: ${user.email}`);

await prisma.$disconnect();