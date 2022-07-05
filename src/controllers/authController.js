import { findUser, createSession } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.sendStatus(422);
  }

  const existingUsers = await createSession(email);

  if (existingUsers.rowCount > 0) {
    return res.sendStatus(409);
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  await createSession(name, email, hashedPassword);

  res.sendStatus(201);
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.sendStatus(422);
  }

  const { rows } = await findUser(email);
  const [user] = rows;

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.sendStatus(401);
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  res.send({
    token,
  });
}
