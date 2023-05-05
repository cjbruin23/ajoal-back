import express, { Request, Response } from "express";
import { User } from "./src/database/entity/user.entity";
import dotenv from "dotenv";
import myDataSource from "./app-data-source";

const cors = require("cors");
const bodyParser = require("body-parser");

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

app.get("/", async (_, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/users", async (_, res: Response) => {
  const users = await myDataSource
    .getRepository(User)
    .createQueryBuilder("users")
    .getMany();
  res.send(users);
});

app.post("/user", async (req: Request, res: Response) => {
  const user = new User();
  try {
    console.log("req body", req.body);
    // await myDataSource.manager.save(user);
  } catch (err) {
    console.log("err", err);
  }
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
