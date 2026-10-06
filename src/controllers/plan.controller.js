import prisma from "../config/prisma.js";

export async function createPlan(req, res) {
  try {
    const {
      name,
      description,
      price,
      durationMonths,
      active,
    } = req.body;

    const plan = await prisma.plan.create({
      data: {
        name,
        description,
        price,
        durationMonths,
        active,
      },
    });

    return res.status(201).json({
      message: "Plano criado com sucesso!",
      plan,
    });
  } catch (error) {
    console.error("Erro ao criar plano:", error);

    return res.status(500).json({
      message: "Erro interno ao criar plano",
    });
  }
}
export async function getPlans(req, res) {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(plans);
  } catch (error) {
    console.error("Erro ao buscar planos:", error);

    return res.status(500).json({
      message: "Erro interno ao buscar planos",
    });
  }
}
export async function getPlanById(req, res) {
  try {
    const { id } = req.params;

    const plan = await prisma.plan.findUnique({
      where: {
        id,
      },
    });

    if (!plan) {
      return res.status(404).json({
        message: "Plano não encontrado",
      });
    }

    return res.status(200).json(plan);
  } catch (error) {
    console.error("Erro ao buscar plano:", error);

    return res.status(500).json({
      message: "Erro interno ao buscar plano",
    });
  }
}
export async function updatePlan(req, res) {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      durationMonths,
      active,
    } = req.body;

    const existingPlan = await prisma.plan.findUnique({
      where: {
        id,
      },
    });

    if (!existingPlan) {
      return res.status(404).json({
        message: "Plano não encontrado",
      });
    }

    const plan = await prisma.plan.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        durationMonths,
        active,
      },
    });

    return res.status(200).json(plan);
  } catch (error) {
    console.error("Erro ao atualizar plano:", error);

    return res.status(500).json({
      message: "Erro interno ao atualizar plano",
    });
  }
}
export async function deletePlan(req, res) {
  try {
    const { id } = req.params;

    const existingPlan = await prisma.plan.findUnique({
      where: {
        id,
      },
    });

    if (!existingPlan) {
      return res.status(404).json({
        message: "Plano não encontrado",
      });
    }

    const plan = await prisma.plan.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Plano excluído com sucesso",
      plan,
    });
  } catch (error) {
    console.error("Erro ao excluir plano:", error);

    return res.status(500).json({
      message: "Erro interno ao excluir plano",
    });
  }
}