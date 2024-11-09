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
const reaction_1 = require("../Models/reaction");
const publication_1 = require("../Models/publication");
const user_1 = require("../Models/user");
const router = (0, express_1.Router)();
router.get("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield reaction_1.Reaction.findAll({
            include: [
                {
                    model: publication_1.Publication,
                    required: false,
                    attributes: ["titre", "description", "zone"],
                },
                {
                    model: user_1.User,
                    required: false,
                    attributes: ["username"],
                },
            ],
        });
        if (response) {
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ message: "Aucune reaction" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Req = req.body;
    try {
        if (Req.pub_id != null && Req.user_id) {
            const find = yield reaction_1.Reaction.findAll({
                where: { user_id: Req.user_id, pub_id: Req.pub_id },
            });
            if (find.length > 0) {
                yield reaction_1.Reaction.destroy({
                    where: { user_id: Req.user_id, pub_id: Req.pub_id },
                });
                res.status(200).json({ message: "Reaction supprimé" });
            }
            else {
                yield reaction_1.Reaction.create({
                    user_id: Req.user_id,
                    pub_id: Req.pub_id,
                });
                res.status(200).json({ message: "Reaction ajouté" });
            }
        }
        else {
            res.status(202).json("Impossible de crée champ vide");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
