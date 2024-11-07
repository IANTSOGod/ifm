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
const email_1 = __importDefault(require("../Config/email"));
const user_1 = require("../Models/user");
const router = (0, express_1.Router)();
router.post("/send", (req, res) => {
    try {
        (0, email_1.default)({
            destination: "irazafindrazaka@mit-ua.mg",
            subject: "Envoi d'email",
            text: "Ceci est un test",
        });
        res.status(200).json({ message: "Email envoyé" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.post("/getUserPassword/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    try {
        const user = yield user_1.User.findOne({ where: { user_id: userId } });
        if (user) {
            if (user.email != null) {
                (0, email_1.default)({
                    destination: user.email,
                    subject: `Récupération du mot de passe`,
                    text: `Le mot de passe de ${user.username} dans anonymat est ${user.mdp}`,
                });
                res
                    .status(200)
                    .json({ message: "Votre mot de passe a été envoyé par email" });
            }
            else {
                res.status(404).json({ message: "Cet utilisateur n'a pas d'email" });
            }
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
