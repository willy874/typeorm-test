"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerMap = void 0;
exports.ControllerMiddleware = ControllerMiddleware;
exports.Route = Route;
exports.ControllerMap = {};
const initController = (name) => {
    if (!exports.ControllerMap[name]) {
        exports.ControllerMap[name] = { router: {} };
    }
    return exports.ControllerMap[name];
};
function ControllerMiddleware(options = {}) {
    return function (target) {
        const config = initController(target.name);
        !config.path && (config.path = options.path);
        !config.middlewares && (config.middlewares = options.middlewares);
    };
}
function Route(options) {
    return function (target, propertyKey) {
        const config = initController(target.constructor.name);
        config.router[propertyKey] = options;
    };
}
