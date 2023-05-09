"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_entity_1 = require("./src/database/entity/user.entity");
const dotenv_1 = __importDefault(require("dotenv"));
const app_data_source_1 = __importDefault(require("./app-data-source"));
const users_service_1 = __importDefault(require("./src/database/repositories/users.service"));
const questions_1 = __importDefault(require("./src/routes/questions"));
const cors = require("cors");
const bodyParser = require("body-parser");
app_data_source_1.default
    .initialize()
    .then(() => console.log("data source has been intitialized"))
    .catch((err) => console.log("Error during Data Source initialization", err));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// MIDDLEWARE
app.use(cors({
    origin: ["http://127.0.0.1:5173"],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/question", questions_1.default);
app.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Express + TypeScript Server");
}));
app.get("/users", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield app_data_source_1.default
        .getRepository(user_entity_1.User)
        .createQueryBuilder("users")
        .getMany();
    res.send(users);
}));
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userService = new users_service_1.default(app_data_source_1.default);
    try {
        let reqBody = req.body;
        const trimAuthId = reqBody.authId.split("|")[1];
        reqBody = Object.assign(Object.assign({}, reqBody), { authId: trimAuthId });
        const user = yield userService.getUserByAuthId(trimAuthId);
        if (!user) {
            yield userService.saveUser(reqBody);
            res.send("User added to DB");
        }
    }
    catch (err) {
        console.log("err", err);
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
