import { Sequelize } from "sequelize";

function createDbFunction() {
    const sequelize = new Sequelize(`${process.env.POSTGRES_URL}`);
    return sequelize;
}

async function authenticateDbConnection(sequelize: Sequelize) {

    try {
      await sequelize.authenticate();
      console.log("success in connection with DB")
    } catch (error) {
      console.error('Unable to connect to database', error)
    }
  }

  export {createDbFunction, authenticateDbConnection}