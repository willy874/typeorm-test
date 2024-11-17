"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRefactoring1731834614515 = void 0;
const typeorm_1 = require("typeorm");
class UserRefactoring1731834614515 {
    async up(queryRunner) {
        console.log('Migration up');
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'name', type: 'varchar', length: '150' },
                { name: 'email', type: 'varchar', length: '150', isUnique: true },
                { name: 'age', type: 'int' },
            ]
        }));
    }
    async down(queryRunner) {
        console.log('Migration down');
        await queryRunner.dropTable('user');
    }
}
exports.UserRefactoring1731834614515 = UserRefactoring1731834614515;
