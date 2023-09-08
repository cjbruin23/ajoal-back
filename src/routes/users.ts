import express, { Request, Response } from "express";
import myDataSource from "../../app-data-source";
import UserService from "../database/repositories/users.service";
import UserPayload from "../models/User.model";
import QuestionsRouter from "./questions";

const router = express.Router({ mergeParams: true });

router.get("/:id", async (req: Request, res: Response) => {
    const userService = new UserService(myDataSource);
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).send(`There is no user by id ${userId}`)
    }
    return res.send(user);

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
      res.status(201).send("User added to DB");
    }
    res.send({ userId: user?.id });
  } catch (err) {
    console.log("err", err);
  }
});

router.use("/:userId/questions", QuestionsRouter);

export default router;
