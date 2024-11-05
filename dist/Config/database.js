"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("../Models/user");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: "sql8742838",
    username: "sql8742838",
    password: "VSaSsDLGzh",
    dialect: "mysql",
    host: "sql8.freesqldatabase.com",
    models: [user_1.User],
});
exports.default = sequelize;
