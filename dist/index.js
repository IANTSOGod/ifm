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
const reaction_1 = __importDefault(require("./Routes/reaction"));
const temoignages_1 = __importDefault(require("./Routes/temoignages"));
const notif_1 = __importDefault(require("./Routes/notif"));
const database_1 = __importDefault(require("./Config/database"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use("/Images", express_1.default.static(path_1.default.join(__dirname, "Images")));
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
app.use("/api/react", reaction_1.default);
app.use("/api/tem", temoignages_1.default);
app.use("/api/notif", notif_1.default);
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
