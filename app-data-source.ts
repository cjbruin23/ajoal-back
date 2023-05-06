import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: process.env.DB_PASSWORD,
  entities: ["dist/src/database/entity/*.js"],
  migrations: ["dist/src/database/migrations/*.js"],
  logging: true,
});

export default myDataSource;
