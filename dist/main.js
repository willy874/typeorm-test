"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./controllers/User"));
const User_2 = __importDefault(require("./models/User"));
const path_1 = __importDefault(require("path"));
const app_1 = require("./libs/app");
const route_1 = require("./libs/route");
new app_1.Application({
    type: 'mysql',
    host: 'app-db-service',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'bam_cms',
    entities: [path_1.default.resolve(process.cwd(), 'dist', 'models', '*.js'), User_2.default],
})
    .useController(User_1.default)
    .initialize(3000)
    .then(() => {
    console.log('Server is running on http://localhost:3000', JSON.stringify(route_1.ControllerMap, null, 2));
});
