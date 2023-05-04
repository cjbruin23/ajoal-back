"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const myDataSource = new typeorm_1.DataSource({
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
exports.default = myDataSource;
