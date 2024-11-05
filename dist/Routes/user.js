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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../Models/user");
const router = (0, express_1.Router)();
router.get("/api/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
router.post("/api/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.status(500).json({ message: "Erreur du serveur", error });
    }
}));
router.post("/api/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Req = req.body;
    try {
        if (Req.username && Req.mdp) {
            const newUser = yield user_1.User.create({
                username: Req.username,
                mdp: Req.mdp,
            });
            res.status(201).json(newUser);
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
router.delete("/api/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.status(500).json({ message: error });
    }
}));
router.post("/api/modify/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    const Req = req.body;
    try {
        const selectedUser = yield user_1.User.findOne({ where: { user_id: userId } });
        if (selectedUser) {
            if (Req.username != null && Req.CIN != null && Req.num_phone != null) {
                selectedUser.username = Req.username;
                selectedUser.num_phone = Req.num_phone;
                selectedUser.CIN = Req.CIN;
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
router.post("/api/GetPassword/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.post("/api/GetUsername/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.post("/api/GetCIN/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.post("/api/GetNum/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = router;
