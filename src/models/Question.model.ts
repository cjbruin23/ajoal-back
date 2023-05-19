import { User } from "../database/entity/user.entity";

interface Question {
  title: string;
  body: string;
  keywords: string[];
  user?: User;
}

export default Question;
