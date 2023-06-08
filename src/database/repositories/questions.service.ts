import { NextFunction } from "express";
import { DataSource } from "typeorm";
import { QuestionRequest } from "../../models/QuestionRequest.model";

class QuestionService {
  dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async saveQuestion(
    userId: number,
    questionRequest: QuestionRequest,
    next: NextFunction
  ) {
    console.log("userId", userId);
    console.log("question", questionRequest);
    if (
      !questionRequest.body ||
      !questionRequest.tags ||
      !questionRequest.title
    ) {
      throw new Error("Question must have all valid fields");
    }
  }
}

export default QuestionService;
