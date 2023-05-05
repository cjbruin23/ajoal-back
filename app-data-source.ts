import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

// We do not want synchronize true for Production
const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: process.env.DB_PASSWORD,
  entities: [__dirname + "dist/src/database/entity/*.js"],
  migrations: [__dirname + "src/database/migrations"],
  logging: true,
  synchronize: true,
});

export default myDataSource;
