import { DataSource } from "typeorm";
import Question from "../../models/Post.model";

class QuestionService {
  dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async saveQuestion(question: Question) {
    console.log("question", question);
  }
}

export default QuestionService;
