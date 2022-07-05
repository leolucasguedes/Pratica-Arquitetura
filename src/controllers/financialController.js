import { financialPost, financialGet, financialCount } from "../repositories/financialRepository.js";
import { tokenValidation } from "../services/financialService.js";
import dotenv from "dotenv";
dotenv.config();

export async function postFinances(req, res) {
  let user;

  await tokenValidation(user);

  const { value, type } = req.body;
  if (!value || !type) {
    return res.sendStatus(422);
  }

  const financialTypes = ["INCOME", "OUTCOME"];
  if (!financialTypes.includes(type)) {
    return res.sendStatus(422);
  }

  if (value < 0) {
    return res.sendStatus(422);
  }

  await financialPost(user, value, type);
  res.sendStatus(201);
}

export async function getFinances(req, res) {
  let user;
  await tokenValidation(user);
  const events = await financialGet(user);
  res.send(events.rows);
}

export async function getFinancesCount(req, res) {
  let user;
  await tokenValidation(user);
  const events = await financialCount(user);
  const sum = events.rows.reduce(
    (total, event) =>
      event.type === "INCOME" ? total + event.value : total - event.value,
    0
  );
  res.send({ sum });
}
