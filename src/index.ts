import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const sequelize = new Sequelize(
  `${process.env.DB_URL}`
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("authenticated successfully");
  } catch (error) {
    console.error("err in connecting to DB", error);
  }
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
