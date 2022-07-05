import cors from "cors";
import express from "express";
import "express-async-errors";
import router from "../routers/index.js";
import handleError from "../middlewares/errorHandlerMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleError);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
