"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("../Models/user");
const image_1 = require("../Models/image");
const publication_1 = require("../Models/publication");
const reaction_1 = require("../Models/reaction");
const temoignage_1 = require("../Models/temoignage");
const notification_1 = require("../Models/notification");
const lecture_1 = require("../Models/lecture");
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
    username: "iantso",
    password: "Ds0jZZTcPtDjWsO5urcSBp3mG8oo6MeX",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Désactiver la vérification de l'autorité de certification (utile si vous n'avez pas de certificat personnalisé)
        },
    },
    host: "dpg-csnimuogph6c73bf9060-a.oregon-postgres.render.com",
    models: [
        user_1.User,
        image_1.Image,
        publication_1.Publication,
        reaction_1.Reaction,
        temoignage_1.Temoignage,
        notification_1.Notification,
        lecture_1.Lecture,
    ],
});
exports.default = sequelize;
