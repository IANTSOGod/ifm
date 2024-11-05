import { Sequelize } from "sequelize-typescript";
import { User } from "../Models/user";

const sequelize = new Sequelize({
  database: "ifm",
  username: "nouvel_utilisateur",
  password: "mot_de_passe",
  dialect: "mysql",
  host: "localhost",
  models: [User],
});

export default sequelize;
