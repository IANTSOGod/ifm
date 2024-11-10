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
  database: "db_ifm",
  username: "db_ifm_user",
  password: "i4mqGoWnGoievyun7gBMHcLZESzVJlIc",
  dialect: "postgres",
  host: "dpg-cso4ll2j1k6c73bbpq60-a.oregon-postgres.render.com",
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,  // Active SSL
      rejectUnauthorized: false,  // Vérifie si le certificat est valide (utilisez true si vous avez un certificat valide)
      minVersion: 'TLSv1.2',  // Force TLS 1.2
    },
  },
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
