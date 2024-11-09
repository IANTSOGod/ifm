import { Sequelize } from "sequelize-typescript";
import { User } from "../Models/user";
import { Image } from "../Models/image";
import { Publication } from "../Models/publication";
import { Reaction } from "../Models/reaction";
import { Temoignage } from "../Models/temoignage";
import { Notification } from "../Models/notification";
import { Lecture } from "../Models/lecture";

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

const sequelize = new Sequelize({
  database: "ifm",
  username: "iantso",
  password: "Ds0jZZTcPtDjWsO5urcSBp3mG8oo6MeX",
  dialect: "postgres",
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true, // Exiger la connexion SSL
      rejectUnauthorized: false, // Désactiver la vérification de l'autorité de certification (utile si vous n'avez pas de certificat personnalisé)
    },
  },
  host: "dpg-csnimuogph6c73bf9060-a.oregon-postgres.render.com",
  models: [
    User,
    Image,
    Publication,
    Reaction,
    Temoignage,
    Notification,
    Lecture,
  ],
});

export default sequelize;
