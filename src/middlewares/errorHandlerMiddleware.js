export default async function handleError(error, req, res, next) {
  console.error(error);
  if(error.type === "notFound") {
    return res.sendStatus(404).status("Not found");
  }
  if(error.type === "unprocessableEntry") {
    return res.sendStatus(422).status("Unprocessable Entry");
  }
  if(error.type === "unauthorized") {
    return res.sendStatus(401).status("Unauthorized");
  }

  return res.sendStatus(500).status("Internal Server Error");
}