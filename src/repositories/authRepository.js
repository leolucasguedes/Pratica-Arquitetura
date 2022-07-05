import connection from "../config/database.js";

export async function findUser(email) {
    return connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
      );
  }

  export async function createSession(name, email, hashedPassword) {
    return connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
      );
  }