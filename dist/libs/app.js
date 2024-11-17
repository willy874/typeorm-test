"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const event_1 = require("./event");
const typeorm_1 = require("typeorm");
class Application {
    current = (0, express_1.default)();
    dataSource;
    emitter = new event_1.EventBus();
    constructor(options) {
        this.dataSource = new typeorm_1.DataSource(options);
        this.current.use(express_1.default.json());
    }
    useController(ControllerConstructor) {
        const controller = new ControllerConstructor();
        controller.dataSource = this.dataSource;
        controller.initialize(this.current);
        return this;
    }
    initialize(port) {
        return Promise.all([
            new Promise((resolve) => this.current.listen(port, () => resolve(null))),
            this.dataSource.initialize(),
        ]).then(() => {
            console.log('App initialize');
            return this;
        });
    }
}
exports.Application = Application;
