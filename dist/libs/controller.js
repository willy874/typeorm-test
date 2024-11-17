"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express_1 = __importDefault(require("express"));
const route_1 = require("./route");
const path_1 = __importDefault(require("path"));
class Controller {
    name;
    dataSource;
    app = (0, express_1.default)();
    init() { }
    initialize(app) {
        this.app = app;
        const config = route_1.ControllerMap[this.constructor.name];
        const baseURL = config.path || '/';
        Object.keys(config.router).forEach((key) => {
            const options = config.router[key];
            const method = options.method.toLowerCase();
            const handler = this[key].bind(this);
            const createRoute = this.app[method].bind(this.app);
            if (handler) {
                const routeURL = path_1.default.join(baseURL, options.path);
                const middlewares = config.middlewares || [];
                createRoute(routeURL, ...middlewares, (req, res) => {
                    handler(req).then((data) => res.send(data));
                });
            }
        });
        this.init();
    }
}
exports.Controller = Controller;
