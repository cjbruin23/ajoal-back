import express, { Request, Response } from "express";
import QuestionService from "../database/repositories/questions.service";
import myDataSource from "../../app-data-source";
import UserService from "../database/repositories/users.service";
import Question from "../models/Question.model";

const router = express.Router({ mergeParams: true });

router.get("/", (req: Request, res: Response) => {
  console.log("get all", req.params);
  res.send("GET Questions");
});

router.get("/:id", (req: Request, res: Response) => {
  console.log("request params", req.params);
  res.send("GET Question");
});

router.post("/", async (req: Request, res: Response) => {
  console.log("request", req);
  const questionService = new QuestionService(myDataSource);
  const routeParams = req.params;
  const userId = routeParams.userId;
  const body = req.body as Question;
  console.log("body", body);
  questionService.saveQuestion(+userId, body);
  res.send();
});

export default router;
