import { DataSource } from "typeorm";
import { User } from "../entity/user.entity";
import UserPayload from "../../models/User.model";

class UserService {
  dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getUserByAuthId(id: string) {
    const user = await this.dataSource
      .getRepository(User)
      .findOneBy({ auth0id: id });
    return user;
  }

  async getUserById(id: string) {
    const user = await this.dataSource
      .getRepository(User)
      .findOneBy({ id: Number(id) });

    return user;
  }

  async saveUser(user: UserPayload) {
    const mappedUser = { auth0id: user.authId, name: user.nickname };
    const result = await this.dataSource.getRepository(User).save(mappedUser);
    return result.id;
  }
}

export default UserService;
