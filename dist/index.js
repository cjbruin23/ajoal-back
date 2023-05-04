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
const dotenv_1 = __importDefault(require("dotenv"));
const app_data_source_1 = __importDefault(require("./app-data-source"));
const user_entity_1 = require("./src/entity/user.entity");
app_data_source_1.default
    .initialize()
    .then(() => console.log("data source has been intitialized"))
    .catch((err) => console.log("Error during Data Source initialization", err));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Express + TypeScript Server");
}));
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield app_data_source_1.default
        .getRepository(user_entity_1.User)
        .createQueryBuilder("users")
        .getMany();
    res.send("Express + TypeScript Server");
}));
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_entity_1.User();
    try {
        yield app_data_source_1.default.manager.save(user);
    }
    catch (err) {
        console.log("err", err);
    }
    console.log(user.id);
    res.send("Express + TypeScript Server");
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
