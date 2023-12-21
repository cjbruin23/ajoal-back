import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { authenticateDbConnection, createDbFunction } from "./utils/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const sequelize = createDbFunction();
authenticateDbConnection(sequelize);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get('/user', (req: Request, res: Response) => {
  res.send('You are looking for user')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

