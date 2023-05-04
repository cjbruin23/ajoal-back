"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("TESTING", process.env.DB_HOST);
const myDataSource = new typeorm_1.DataSource({
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
exports.default = myDataSource;