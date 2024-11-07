"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("../Models/user");
const image_1 = require("../Models/image");
const publication_1 = require("../Models/publication");
//Sync en ligne
/*{
  database: "sql8742838",
  username: "sql8742838",
  password: "VSaSsDLGzh",
  dialect: "mysql",
  host: "sql8.freesqldatabase.com",
  models: [User],
}
*/
const sequelize = new sequelize_typescript_1.Sequelize({
    database: "ifm",
    username: "nouvel_utilisateur",
    password: "mot_de_passe",
    dialect: "mysql",
    host: "localhost",
    models: [user_1.User, image_1.Image, publication_1.Publication],
});
exports.default = sequelize;
