import express, { NextFunction, Request, Response } from "express";
import QuestionService from "../database/repositories/questions.service";
import myDataSource from "../../app-data-source";
import { QuestionRequest } from "../models/QuestionRequest.model";
import UserService from "../database/repositories/users.service";

const router = express.Router({ mergeParams: true });

router.get("/", async (req: Request, res: Response) => {
  const questionsService = new QuestionService(myDataSource);
  const questionResults = await questionsService.getAllQuestionsForUser(+req.params.userId);
  res.status(200).json(questionResults);
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questionService = new QuestionService(myDataSource);
    const userService = new UserService(myDataSource);
    const routeParams = req.params;
    const userId = +routeParams.userId;
    const body = req.body as QuestionRequest;

    const saveResult = await questionService.saveQuestion(
      userId,
      body,
      userService,
      next
    );
    res.send(`OK ${saveResult}`);
  } catch (err) {
    console.error("controller err", err);
    res.status(400).send("Invalid fields");
  }
});

export default router;
