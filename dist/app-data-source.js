"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// To fix the 'No entities found' error when running .ts files,
// we can depend on an env variable to decide whether to point
// the datasource to the dist file or the ts files
const myDataSource = new typeorm_1.DataSource({
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
exports.default = myDataSource;
//# sourceMappingURL=app-data-source.js.map