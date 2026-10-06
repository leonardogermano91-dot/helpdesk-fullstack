import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createContract = async (req, res) => {
  const { role } = req.user;

  if (role !== "ADMIN" && role !== "ATTENDANT") {
    return res.status(403).json({
      message: "Acesso negado"
    });
  }
  try {
    const {
      clientId,
      planId,
      startDate,
      endDate,
      active
    } = req.body;

    if (!clientId || !planId || !startDate || !endDate) {
      return res.status(400).json({
        message: "clientId, planId, startDate e endDate são obrigatórios"
      });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        message: "startDate e endDate devem ser datas válidas"
      });
    }
    if (start >= end) {
      return res.status(400).json({
        message: "startDate deve ser anterior a endDate"
      });
    }

    const contract = await prisma.contract.create({
      data: {
        clientId,
        planId,
        startDate: start,
        endDate: end,
        active: active ?? true
      }
    });

    return res.status(201).json({
      message: "Contrato criado com sucesso",
      contract
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno ao criar contrato",
      error: error.message
    });
  }
};

export const getContracts = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "ADMIN" && role !== "ATTENDANT") {
      return res.status(403).json({
        message: "Acesso negado"
      });
    }

    const contracts = await prisma.contract.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.status(200).json(contracts);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno ao buscar contratos"
    });
  }
};
export const getContractById = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "ADMIN" && role !== "ATTENDANT") {
      return res.status(403).json({
        message: "Acesso negado"
      });
    }

    const { id } = req.params;

    const contract = await prisma.contract.findUnique({
      where: {
        id
      }
    });

    if (!contract) {
      return res.status(404).json({
        message: "Contrato não encontrado"
      });
    }

    return res.status(200).json(contract);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno ao buscar contrato"
    });
  }
};

export const updateContract = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "ADMIN" && role !== "ATTENDANT") {
      return res.status(403).json({
        message: "Acesso negado"
      });
    }

    const { id } = req.params;

    const {
      startDate,
      endDate,
      active
    } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "startDate e endDate são obrigatórios"
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        message: "startDate e endDate devem ser datas válidas"
      });
    }

    if (start >= end) {
      return res.status(400).json({
        message: "startDate deve ser anterior a endDate"
      });
    }

    const contract = await prisma.contract.update({
      where: {
        id
      },
      data: {
        startDate: start,
        endDate: end,
        active
      }
    });

    return res.status(200).json({
      message: "Contrato atualizado com sucesso",
      contract
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Contrato não encontrado"
      });
    }

    return res.status(500).json({
      message: "Erro interno ao atualizar contrato"
    });
  }
};
export const deleteContract = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "ADMIN") {
      return res.status(403).json({
        message: "Acesso negado"
      });
    }

    const { id } = req.params;

    const contract = await prisma.contract.delete({
      where: {
        id
      }
    });

    return res.status(200).json({
      message: "Contrato excluído com sucesso",
      contract
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Contrato não encontrado"
      });
    }

    return res.status(500).json({
      message: "Erro interno ao excluir contrato"
    });
  }
};