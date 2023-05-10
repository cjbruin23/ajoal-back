import express, { Request, Response } from "express";
import myDataSource from "../../app-data-source";
import UserService from "../database/repositories/users.service";
import UserPayload from "../models/User.model";
import { User } from "../database/entity/user.entity";

const router = express.Router();

router.get("/users", async (_, res: Response) => {
  const users = await myDataSource
    .getRepository(User)
    .createQueryBuilder("users")
    .getMany();
  res.send(users);
});

router.post("/", async (req: Request, res: Response) => {
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

export default router;
