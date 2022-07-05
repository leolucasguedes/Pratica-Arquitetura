export async function verifyToken() {
  const authorization = req.headers.authorization || "";
  const token = authorization.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }
}
