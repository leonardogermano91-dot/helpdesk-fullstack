import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const createTicket = async (req, res) => {
  try {
    const {
      clientId,
      contractId,
      technicianId,
      subject,
      description,
      status
    } = req.body;

    if (!clientId || !contractId || !subject || !description) {
      return res.status(400).json({
        message: "clientId, contractId, subject e description são obrigatórios"
      });
    }

    const client = await prisma.client.findUnique({
      where: { id: clientId }
    });

    if (!client) {
      return res.status(404).json({
        message: "Cliente não encontrado"
      });
    }
    const contract = await prisma.contract.findUnique({
      where: { id: contractId }
    });

    if (!contract) {
      return res.status(404).json({
        message: "Contrato não encontrado"
      });
    }
    if (contract.clientId !== clientId) {
      return res.status(400).json({
        message: "O contrato não pertence ao cliente informado"
      });
    }

    const ticket = await prisma.ticket.create({
      data: {
        clientId,
        contractId,
        technicianId,
        subject,
        description,
        status: status ?? "OPEN"
      }
    });

    return res.status(201).json({
      message: "Ticket criado com sucesso",
      ticket
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno ao criar ticket"
    });
  }
};

export const getTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    const ticketsWithClients = await Promise.all(
      tickets.map(async (ticket) => {

        const client = await prisma.client.findUnique({
          where: { id: ticket.clientId }
        });

        const contract = await prisma.contract.findUnique({
          where: { id: ticket.contractId }
        });

        return {
          ...ticket,
          client,
          contract
        };
      })
    );

    return res.status(200).json(ticketsWithClients);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno ao buscar tickets"
    });
  }
};
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await prisma.ticket.findUnique({
      where: { id }
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket não encontrado"
      });
    }

    const client = await prisma.client.findUnique({
      where: { id: ticket.clientId }
    });

    const contract = await prisma.contract.findUnique({
      where: { id: ticket.contractId }
    });

    return res.status(200).json({
      ...ticket,
      client,
      contract
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno ao buscar ticket"
    });
  }
};
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.user;

    const existingTicket = await prisma.ticket.findUnique({
      where: { id }
    });

    if (!existingTicket) {
      return res.status(404).json({
        message: "Ticket não encontrado"
      });
    }

    if (role === "TECHNICIAN" && existingTicket.technicianId !== userId) {
      return res.status(403).json({
        message: "Técnico não pode atualizar este ticket"
      });
    }
    const {
      subject,
      description,
      status,
      technicianId
    } = req.body;

    const allowedStatus = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "status deve ser OPEN, IN_PROGRESS ou CLOSED"
      });
    }


    const ticket = await prisma.ticket.update({
      where: { id },
      data: {
        subject,
        description,
        status,
        technicianId
      }
    });

    return res.status(200).json({
      message: "Ticket atualizado com sucesso",
      ticket
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Ticket não encontrado"
      });
    }

    return res.status(500).json({
      message: "Erro interno ao atualizar ticket"
    });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.user;

    const existingTicket = await prisma.ticket.findUnique({
      where: { id }
    });

    if (!existingTicket) {
      return res.status(404).json({
        message: "Ticket não encontrado"
      });
    }

    if (role === "TECHNICIAN" && existingTicket.technicianId !== userId) {
      return res.status(403).json({
        message: "Técnico não pode excluir este ticket"
      });
    }

    const ticket = await prisma.ticket.delete({
      where: { id }
    });
    return res.status(200).json({
      message: "Ticket excluído com sucesso",
      ticket
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Ticket não encontrado"
      });
    }

    return res.status(500).json({
      message: "Erro interno ao excluir ticket"
    });
  }
};

