import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

console.log("TESTING", process.env.DB_HOST);

const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: process.env.DB_PASSWORD,
  entities: ["dist/src/entity/*.js"],
  logging: true,
  synchronize: true,
});

export default myDataSource;
