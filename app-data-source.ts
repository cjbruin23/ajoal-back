import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

// To fix the 'No entities found' error when running .ts files,
// we can depend on an env variable to decide whether to point
// the datasource to the dist file or the ts files

const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_DATABASE,
  username: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  entities: ["dist/src/database/entity/*.js"],
  migrations: ["dist/src/database/migrations/*.js"],
  logging: true,
});

export default myDataSource;
