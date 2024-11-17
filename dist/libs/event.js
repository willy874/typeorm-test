"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
class EventBus {
    listeners = [];
    subscribe(cb) {
        this.listeners.push(cb);
    }
    notify() {
        this.listeners.forEach((cb) => cb());
    }
}
exports.EventBus = EventBus;
