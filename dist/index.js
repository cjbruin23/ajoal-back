"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_data_source_1 = __importDefault(require("./app-data-source"));
const questions_1 = __importDefault(require("./src/routes/questions"));
const users_1 = __importDefault(require("./src/routes/users"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const error_middleware_1 = __importDefault(require("./src/middleware/error.middleware"));
app_data_source_1.default
    .initialize()
    .then(() => console.log("data source has been intitialized"))
    .catch((err) => console.log("Error during Data Source initialization", err));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// MIDDLEWARE
app.use((0, cors_1.default)({
    origin: ["http://127.0.0.1:5173"],
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// ROUTES
app.use("/users", users_1.default);
app.use("users/:userid/questions", questions_1.default);
app.use(error_middleware_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
