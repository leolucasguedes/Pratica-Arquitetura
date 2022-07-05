import express from "express";
import { postFinances, getFinances, getFinancesCount } from "../controllers/financialController.js";
import { verifyToken } from "../middlewares/tokenValidator.js";

const financialRouter = express.Router();

financialRouter.post("/financial-events", verifyToken, postFinances);
financialRouter.get("/financial-events", verifyToken, getFinances);
financialRouter.get("/financial-events/sum", verifyToken, getFinancesCount);

export default financialRouter; 