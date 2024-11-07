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
const publication_1 = require("../Models/publication");
const sequelize_1 = require("sequelize");
const user_1 = require("../Models/user");
const router = (0, express_1.Router)();
router.get("/list", (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield publication_1.Publication.findAll();
        if (response) {
            res.status(200).json(response);
        }
        else {
            res.status(409).json({ message: "Aucun faits dans la bd" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/Find/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const factId = parseInt(req.params.id, 10);
    try {
        const response = yield publication_1.Publication.findOne({ where: { pub_id: factId } });
        if (response) {
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ message: "Facts not found" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.body.search;
    console.log(searchTerm);
    try {
        //tina atao
        //SELECT *  FROM `publication`  LEFT JOIN `user`    ON `publication`.`user_id` = `user`.`user_id`  WHERE `publication`.`titre` LIKE '%iantso%'     OR `publication`.`description` LIKE '%iantso%'     OR `user`.`username` LIKE '%iantso%';
        if (searchTerm) {
            const publications = yield publication_1.Publication.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        { titre: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                        { description: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    ],
                },
                include: [
                    {
                        model: user_1.User,
                        required: false,
                        attributes: ["username"],
                    },
                ],
            });
            if (publications.length > 0) {
                console.log("ty le nandefa kai");
                res.status(200).json(publications);
            }
            else {
                try {
                    const response = yield user_1.User.findOne({
                        where: { username: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    });
                    if (response) {
                        const selectedId = response === null || response === void 0 ? void 0 : response.user_id;
                        const resp = yield publication_1.Publication.findAll({
                            where: {
                                user_id: selectedId,
                            },
                            include: [
                                {
                                    model: user_1.User,
                                    required: false,
                                    attributes: ["username"],
                                },
                            ],
                        });
                        if (resp.length > 0) {
                            console.log("tafiditra ato");
                            res.status(200).json(resp);
                        }
                        else {
                            res
                                .status(404)
                                .json({ message: "Aucune publication correspondante" });
                        }
                    }
                    else {
                        res
                            .status(404)
                            .json({ message: "Aucune publication correspondante" });
                    }
                }
                catch (error) {
                    res.status(500).json(error);
                }
            }
        }
        else {
            res.status(400).json({ message: "Le champ de recherche est requis" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(req.params.id, 10);
    try {
        const destroyCount = yield publication_1.Publication.destroy({
            where: { pub_id: pubId },
        });
        if (destroyCount > 0) {
            res.status(200).json({ message: "La publication a été supprimé" });
        }
        else {
            res.status(404).json({ message: "Cette publication n'existe pas" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const Req = req.body;
    console.log(Req.titre + Req.description + Req.zone + Req.user_id);
    try {
        if (Req.titre != null &&
            Req.description != null &&
            Req.zone != null &&
            Req.user_id != null) {
            yield publication_1.Publication.create({
                titre: Req.titre,
                user_id: Req.user_id,
                description: Req.description,
                date: currentDate,
                zone: Req.zone,
            });
            res.status(200).json({ message: "Fait créé" });
        }
        else {
            res.status(202).json({ message: "Champ vide impossible de creer" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
