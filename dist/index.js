"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./Routes/user"));
const email_1 = __importDefault(require("./Routes/email"));
const publication_1 = __importDefault(require("./Routes/publication"));
const image_1 = __importDefault(require("./Routes/image"));
const database_1 = __importDefault(require("./Config/database"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));
app.use("/api/users", user_1.default);
app.use("/api/email", email_1.default);
app.use("/api/pub", publication_1.default);
app.use("/api/image", image_1.default);
database_1.default
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
