import { DataSource } from "typeorm";

const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: "",
  password: process.env.DB_PASSWORD,
  database: "",
  entities: ["dist/src/entity/*.js"],
  logging: true,
  synchronize: true,
});

export default myDataSource;
