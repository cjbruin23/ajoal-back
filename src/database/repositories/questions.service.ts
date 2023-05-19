import { DataSource } from "typeorm";

class QuestionService {
  dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async saveQuestion(userId: number, questionRequest: any) {
    console.log("question", questionRequest);
  }
}

export default QuestionService;
