import express, { NextFunction, Request, Response } from "express";
import QuestionService from "../database/repositories/questions.service";
import myDataSource from "../../app-data-source";
import { QuestionRequest } from "../models/QuestionRequest.model";
import UserService from "../database/repositories/users.service";

const router = express.Router({ mergeParams: true });

router.get("/", async (req: Request, res: Response) => {
  console.log("get all", req.params);
  const questionsService = new QuestionService(myDataSource);
  await questionsService.getAllQuestionsForUser(+req.params.userId)
  res.send("GET Questions");
});

router.get("/:id", (req: Request, res: Response) => {
  console.log("request params", req.params);
  res.send("GET Question");
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log("request", req);
  try {
    const questionService = new QuestionService(myDataSource);
    const userService = new UserService(myDataSource);
    const routeParams = req.params;
    const userId = routeParams.userId;
    const body = req.body as QuestionRequest;
    console.log("body", body);
    const saveResult = await questionService.saveQuestion(
      +userId,
      body,
      userService,
      next
    );
    res.send(`OK ${saveResult}`);
  } catch (err) {
    console.log("controller err", err);
    res.status(400).send("Invalid fields");
  }
});

export default router;
