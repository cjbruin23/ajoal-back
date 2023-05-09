import { DataSource } from "typeorm";

class QuestionService {
  dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }
}

export default QuestionService;
