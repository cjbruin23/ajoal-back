import express, { Request, Response } from "express";
import dotenv from "dotenv";
import myDataSource from "./app-data-source";
import { User } from "./src/entity/user.entity";

myDataSource
  .initialize()
  .then(() => console.log("data source has been intitialized"))
  .catch((err) => console.log("Error during Data Source initialization", err));

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", async (_, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/user", async (req: Request, res: Response) => {
  const users = await myDataSource
    .getRepository(User)
    .createQueryBuilder("users")
    .getMany();
  res.send("Express + TypeScript Server");
});

app.post("/user", async (req: Request, res: Response) => {
  const user = new User();
  try {
    await myDataSource.manager.save(user);
  } catch (err) {
    console.log("err", err);
  }
  console.log(user.id);
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
