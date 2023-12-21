import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const sequelize = new Sequelize(`${process.env.POSTGRES_URL}`);

authenticateDbConnection();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get('/user', (req: Request, res: Response) => {
  res.send('You are looking for user')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

async function authenticateDbConnection() {

  try {
    await sequelize.authenticate();
    console.log("success in connection with DB")
  } catch (error) {
    console.error('Unable to connect to database', error)
  }
}