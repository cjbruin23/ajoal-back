import express, { Request, Response } from "express";
import myDataSource from "../../app-data-source";
import UserService from "../database/repositories/users.service";
import UserPayload from "../models/User.model";
import QuestionsRouter from "./questions";

const router = express.Router({ mergeParams: true });

router.get("/:id", async (req: Request, res: Response) => {
  const userService = new UserService(myDataSource);
  const userId = req.params.id;
  console.log("userId", userId);
  const user = await userService.getUserById(userId);
  console.log("user", user);
  res.send(user);
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

router.use("/:userId/questions", QuestionsRouter);

export default router;
