import express, { Response } from "express";
import dotenv from "dotenv";
import myDataSource from "./app-data-source";
import QuestionsRoute from "./src/routes/questions";
import UserRoute from "./src/routes/users";

import cors from "cors";
import bodyParser from "body-parser";

myDataSource
  .initialize()
  .then(() => console.log("data source has been intitialized"))
  .catch((err) => console.log("Error during Data Source initialization", err));

dotenv.config();

const app = express();
const port = process.env.PORT;

// MIDDLEWARE
app.use(
  cors({
    origin: ["http://127.0.0.1:5173"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use("/question", QuestionsRoute);
app.use("/user", UserRoute);

app.get("/", async (_, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
