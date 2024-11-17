"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../libs/controller");
const route_1 = require("../libs/route");
const User_1 = __importDefault(require("../models/User"));
let UserController = class UserController extends controller_1.Controller {
    userRepo;
    init() {
        this.userRepo = this.dataSource.manager.getRepository(User_1.default);
    }
    async getUsers() {
        const users = await this.userRepo.createQueryBuilder().getMany();
        return {
            data: users,
            message: 'success!'
        };
    }
    async createUser() {
        await this.userRepo
            .createQueryBuilder()
            .insert()
            .values({
            name: "Timber",
            email: "willy@gmail.com",
            age: 33
        })
            .execute();
        return { message: 'success!' };
    }
    async deleteUser(req) {
        await this.userRepo
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: req.params.id })
            .execute();
        return { message: 'success!' };
    }
};
__decorate([
    (0, route_1.Route)({ method: 'GET', path: '/post-data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, route_1.Route)({ method: 'POST', path: '/post-data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, route_1.Route)({ method: 'DELETE', path: '/post-data/:id' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, route_1.ControllerMiddleware)({
        path: '/api'
    })
], UserController);
exports.default = UserController;
