import express from "express";
import clientRoutes from "./routes/client.routes.js";
import healthRoutes from "./routes/health.routes.js";
import planRoutes from "./routes/plan.routes.js";
import contractRoutes from "./routes/contract.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use("/api", healthRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);



app.get("/", (req, res) => {
    res.json({
        message: "HelpDesk API funcionando!"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});