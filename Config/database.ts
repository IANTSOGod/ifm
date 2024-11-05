import { Sequelize } from "sequelize-typescript";
import { User } from "../Models/user";

const sequelize = new Sequelize({
  database: "sql8742838",
  username: "sql8742838",
  password: "VSaSsDLGzh",
  dialect: "mysql",
  host: "sql8.freesqldatabase.com",
  models: [User],
});

export default sequelize;
