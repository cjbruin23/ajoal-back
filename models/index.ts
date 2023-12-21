import { Sequelize } from "sequelize";
import createUserModel from "./User";

async function syncModels(sequelize: Sequelize) {
    createUserModel(sequelize);

    await sequelize.sync();

    return true;
}

export default syncModels;