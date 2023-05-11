import express, { Request, Response } from "express";
import QuestionService from "../database/repositories/questions.service";
import myDataSource from "../../app-data-source";
import UserService from "../database/repositories/users.service";

const router = express.Router({ mergeParams: true });

router.get("/", (req: Request, res: Response) => {
  console.log("get all", req.params);
  res.send("GET Questions");
});

router.get("/:id", (req: Request, res: Response) => {
  console.log("request params", req.params);
  res.send("GET Questions");
});

router.post("/", async (req: Request, res: Response) => {
  const userService = new UserService(myDataSource);
  const questionService = new QuestionService(myDataSource);
  const routeParams = req.params;
  const userId = routeParams.userId;

  const user = await userService.getUserById(userId);
  console.log("user", user);
  res.send();
});

export default router;
