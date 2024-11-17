"use strict";
const path = require('path');
const { DataSource } = require('typeorm');
module.exports = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: 'password',
    database: 'bam_cms',
    entities: [path.resolve(__dirname, 'models', '*.ts')],
    migrations: [path.resolve(__dirname, 'migrations', '*.ts')],
});
