"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../Models/user");
const username_splitter_1 = __importDefault(require("../Config/username.splitter"));
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
router.get("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/findByusr", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Req = req.body;
    const searchTerm = Req.search;
    try {
        const users = yield user_1.User.findAll({
            where: { username: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
        });
        if (users.length > 0) {
            res.status(200).json(users);
        }
        else {
            res.status(404).json({ message: "Aucun utilisateur trouvé" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Req = req.body;
    const searchTerm = Req.search;
    try {
        const users = yield user_1.User.findAll({
            where: { username: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
        });
        if (users.length > 0) {
            res.status(200).json(users);
        }
        else {
            res.status(404).json({ message: "Aucun utilisateur correspondant" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Req = req.body;
    try {
        const users = yield user_1.User.findAll({
            where: { username: Req.username },
        });
        if (users.length > 0) {
            const usersWithValidPassword = users.filter((user) => user.mdp === Req.mdp);
            if (usersWithValidPassword.length === 1) {
                res.status(200).json(usersWithValidPassword[0]);
            }
            else if (usersWithValidPassword.length > 1) {
                res.status(409).json({
                    message: "Plusieurs utilisateurs avec le même mot de passe trouvés",
                });
            }
            else {
                res.status(401).json({ message: "Mot de passe incorrect" });
            }
        }
        else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Req = req.body;
    var usr = Req.username;
    const MDP = Req.mdp;
    try {
        if (usr && MDP) {
            var search = yield user_1.User.findOne({ where: { username: usr } });
            while (search) {
                usr = (0, username_splitter_1.default)(usr);
                search = yield user_1.User.findOne({ where: { username: usr } });
            }
            yield user_1.User.create({
                username: usr,
                mdp: MDP,
            });
            if (Req.username === usr) {
                res.status(201).json({ message: "Utilisateur crée" });
            }
            else {
                res.status(201).json({ message: `Utilisateur ${usr} crée` });
            }
        }
        else {
            res
                .status(400)
                .json({ message: "Nom d'utilisateur et mot de passe sont requis." });
        }
    }
    catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        res.status(500).json(error);
    }
}));
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    try {
        const deletedCount = yield user_1.User.destroy({ where: { user_id: userId } });
        if (deletedCount > 0) {
            res.status(200).json({ message: "Utilisateur supprimé" });
        }
        else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/modify/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    const Req = req.body;
    try {
        const selectedUser = yield user_1.User.findOne({ where: { user_id: userId } });
        if (selectedUser) {
            selectedUser.CIN = Req.CIN != null ? Req.CIN : selectedUser.CIN;
            selectedUser.email = Req.email != null ? Req.email : selectedUser.email;
            selectedUser.num_phone =
                Req.num_phone != null ? Req.num_phone : selectedUser.num_phone;
            selectedUser.mdp = Req.mdp != null ? Req.mdp : selectedUser.mdp;
            if (Req.username != null) {
                var usr = Req.username;
                var search = yield user_1.User.findOne({ where: { username: usr } });
                while (search) {
                    usr = (0, username_splitter_1.default)(usr);
                    search = yield user_1.User.findOne({ where: { username: usr } });
                }
                selectedUser.username = usr;
            }
            else {
                selectedUser.username = selectedUser.username;
            }
            yield selectedUser.save();
            res.status(200).json({ message: "Les modifications on réussi" });
        }
        else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/GetPassword/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    try {
        const response = yield user_1.User.findOne({ where: { user_id: userId } });
        if (response) {
            res.status(200).json({ password: response.mdp });
        }
        else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/GetUsername/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    try {
        const response = yield user_1.User.findOne({ where: { user_id: userId } });
        if (response) {
            res.status(200).json({ username: response.username });
        }
        else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/GetCIN/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    try {
        const response = yield user_1.User.findOne({ where: { user_id: userId } });
        if (response) {
            res.status(200).json({ CIN: response.CIN });
        }
        else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/GetNum/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    try {
        const response = yield user_1.User.findOne({ where: { user_id: userId } });
        if (response) {
            res.status(200).json({ num_phone: response.num_phone });
        }
        else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/GetEmail/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    try {
        const response = yield user_1.User.findOne({ where: { user_id: userId } });
        if (response) {
            res.status(200).json({ email: response.email });
        }
        else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/Find/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    try {
        const response = yield user_1.User.findOne({ where: { user_id: userId } });
        if (response) {
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
