import { Sequelize } from "sequelize-typescript";
import { User } from "../Models/user";
import { Image } from "../Models/image";
import { Publication } from "../Models/publication";
import { Reaction } from "../Models/reaction";

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
  username: "nouvel_utilisateur",
  password: "mot_de_passe",
  dialect: "mysql",
  host: "localhost",
  models: [User, Image, Publication,Reaction],
});

export default sequelize;
