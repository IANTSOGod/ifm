"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("../Models/user");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: "ifm",
    username: "nouvel_utilisateur",
    password: "mot_de_passe",
    dialect: "mysql",
    host: "localhost",
    models: [user_1.User],
});
exports.default = sequelize;
