import express, { NextFunction, Request, Response } from "express";
import QuestionService from "../database/repositories/questions.service";
import myDataSource from "../../app-data-source";
import { QuestionRequest } from "../models/QuestionRequest.model";

const router = express.Router({ mergeParams: true });

router.get("/", (req: Request, res: Response) => {
  console.log("get all", req.params);
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
    const routeParams = req.params;
    const userId = routeParams.userId;
    const body = req.body as QuestionRequest;
    console.log("body", body);
    await questionService.saveQuestion(+userId, body, next);
    res.send("OK");
  } catch (err) {
    console.log("controller err", err);
    res.status(400).send("Invalid fields");
  }
});

export default router;
