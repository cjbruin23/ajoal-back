import express, { Request, Response } from "express";
import { User } from "./src/database/entity/user.entity";
import dotenv from "dotenv";
import myDataSource from "./app-data-source";
import UserService from "./src/database/repositories/users.service";
import UserPayload from "./src/models/User.model";

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
  const userService = new UserService(myDataSource);

  try {
    let reqBody = req.body as UserPayload;
    const trimAuthId = reqBody.authId.split("|")[1];
    reqBody = { ...reqBody, authId: trimAuthId };
    const user = await userService.getUserByAuthId(trimAuthId);
    if (!user) {
      await userService.saveUser(reqBody);
      res.send("User added to DB");
    }
  } catch (err) {
    console.log("err", err);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
