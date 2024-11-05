import "reflect-metadata";

import express from "express";
import cors from "cors";
import UserRoutes from "./Routes/user";
import sequelize from "./Config/database";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(UserRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Base de données synchronisée.");
  })
  .catch((error) => {
    console.error("Erreur de synchronisation : ", error);
  });

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
