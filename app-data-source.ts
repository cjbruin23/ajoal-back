import { DataSource } from "typeorm";

const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: "test",
  password: process.env.DB_PASSWORD,
  database: "test",
  entities: ["src/entity/*.js"],
  logging: true,
  synchronize: true,
});
