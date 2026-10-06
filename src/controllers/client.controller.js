import prisma from "../config/prisma.js";

export async function createClient(req, res) {
  const { name, email, phone, cpf } = req.body;

  const client = await prisma.client.create({
    data: {
      name,
      email,
      phone,
      cpf
    }
  });

  res.status(201).json({
    message: "Cliente criado com sucesso!",
    client
  });
}
export async function getClients(req, res) {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(clients);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);

    return res.status(500).json({
      message: "Erro interno ao buscar clientes",
    });
  }
}
export async function getClientById(req, res) {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    });

    if (!client) {
      return res.status(404).json({
        message: "Cliente não encontrado",
      });
    }

    return res.status(200).json(client);
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);

    return res.status(500).json({
      message: "Erro interno ao buscar cliente",
    });
  }
}
export async function updateClient(req, res) {
  try {
    const { id } = req.params;
    const { name, email, phone, cpf } = req.body;

    const existingClient = await prisma.client.findUnique({
      where: {
        id,
      },
    });

    if (!existingClient) {
      return res.status(404).json({
        message: "Cliente não encontrado",
      });
    }

    const client = await prisma.client.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
        cpf,
      },
    });

    return res.status(200).json(client);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);

    return res.status(500).json({
      message: "Erro interno ao atualizar cliente",
    });
  }
}
export async function deleteClient(req, res) {
  try {
    const { id } = req.params;

    const existingClient = await prisma.client.findUnique({
      where: {
        id,
      },
    });

    if (!existingClient) {
      return res.status(404).json({
        message: "Cliente não encontrado",
      });
    }

    const client = await prisma.client.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Cliente excluído com sucesso",
      client,
    });
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);

    return res.status(500).json({
      message: "Erro interno ao excluir cliente",
    });
  }
}