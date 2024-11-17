"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User1731863060069 = void 0;
const typeorm_1 = require("typeorm");
class User1731863060069 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                { name: "name", type: "varchar", length: "150" },
                { name: "email", type: "varchar", length: "150", isUnique: true },
                { name: "age", type: "int" },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("user");
    }
}
exports.User1731863060069 = User1731863060069;
