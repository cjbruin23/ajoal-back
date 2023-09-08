import { NextFunction } from "express";
import { DataSource } from "typeorm";
import { QuestionRequest } from "../../models/QuestionRequest.model";
import { Question } from "../entity/question.entity";
import UserService from "./users.service";

class QuestionService {
  dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getAllQuestionsForUser(userId: number) {
    const repository = this.dataSource.getRepository(Question);
    const result = await repository.find({
      where: {
        user: {
          id: userId
        }
      }
    });
    console.log('result', result)
    return result;
  }

  async saveQuestion(
    userId: number,
    questionRequest: QuestionRequest,
    userService: UserService,
    _: NextFunction
  ) {
    console.log("question", questionRequest);
    const body = questionRequest.body;
    const tags = questionRequest.tags;
    const title = questionRequest.title;
    if (!body || !tags || !title) {
      throw new Error("Question must have all valid fields");
    }
    const user = await userService.getUserById(userId.toString());
    if (!user) {
      throw new Error("No user entity exists");
    }
    const question = new Question();

    question.body = body;
    question.title = title;
    question.keywords = tags;
    question.user = user;

    const result = await this.dataSource.getRepository(Question).save(question);
    console.log("result", result);
    return result.id;
  }
}

export default QuestionService;
