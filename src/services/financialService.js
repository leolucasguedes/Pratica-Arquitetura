import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function tokenValidation(user) {
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw { type: "unauthorized", message: "validation Error" };
  }
}
