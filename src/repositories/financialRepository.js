import connection from "../config/database.js";

export async function financialPost(user, value, type) {
  return connection.query(
    `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
    [user.id, value, type]
  );
}

export async function financialGet(user) {
  return connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [user.id]
  );
}

export async function financialCount(user) {
    return connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [user.id]
      );
  }
