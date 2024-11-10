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
const publication_1 = require("../Models/publication");
const sequelize_1 = require("sequelize");
const user_1 = require("../Models/user");
const image_1 = require("../Models/image");
const reaction_1 = require("../Models/reaction");
const temoignage_1 = require("../Models/temoignage");
const notification_1 = require("../Models/notification");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../Images")); // Chemin relatif au projet
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
        const fileExtension = path_1.default.extname(file.originalname);
        const newFileName = `image_${timestamp}${fileExtension}`;
        cb(null, newFileName);
    },
});
const upload = (0, multer_1.default)({ storage });
router.get("/andrana", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hackaton");
}));
router.get("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var response = yield publication_1.Publication.findAll({
            include: [
                {
                    model: image_1.Image,
                    required: false,
                    attributes: ["image_id", "image"],
                },
                {
                    model: user_1.User,
                    required: false,
                    attributes: ["username"],
                },
                {
                    model: reaction_1.Reaction,
                    required: false,
                    attributes: ["type", "user_id"],
                },
                {
                    model: temoignage_1.Temoignage,
                    required: false,
                    attributes: ["corps", "date", "user_id"],
                    include: [
                        {
                            model: user_1.User,
                            as: "user",
                            required: false,
                            attributes: ["username"],
                        },
                    ],
                },
                {
                    model: notification_1.Notification,
                    required: false,
                    attributes: ["user_id", "pub_id"],
                },
            ],
        });
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
router.post("/Find/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Req = req.body;
    const factId = Req.pub_id;
    try {
        const response = yield publication_1.Publication.findOne({
            where: { pub_id: factId },
            include: [
                {
                    model: user_1.User,
                    required: false,
                    attributes: ["username"],
                },
                {
                    model: image_1.Image,
                    required: false,
                    attributes: ["image", "image_id"],
                },
                {
                    model: reaction_1.Reaction,
                    required: false,
                    attributes: ["type", "user_id"],
                },
                {
                    model: temoignage_1.Temoignage,
                    required: false,
                    attributes: ["corps", "date", "user_id"],
                    include: [
                        {
                            model: user_1.User,
                            as: "user",
                            required: false,
                            attributes: ["username"], // Les attributs que vous souhaitez inclure de l'utilisateur
                        },
                    ],
                },
            ],
        });
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
router.post("/searchByAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.body.search;
    console.log(searchTerm);
    try {
        //tina atao
        //SELECT *  FROM `publication`  LEFT JOIN `user`    ON `publication`.`user_id` = `user`.`user_id`  WHERE `publication`.`titre` LIKE '%iantso%'     OR `publication`.`description` LIKE '%iantso%'     OR `user`.`username` LIKE '%iantso%';
        if (searchTerm) {
            var publications = yield publication_1.Publication.findAll({
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
                    {
                        model: image_1.Image,
                        required: false,
                        attributes: ["image", "image_id"],
                    },
                    {
                        model: reaction_1.Reaction,
                        required: false,
                        attributes: ["type", "user_id"],
                    },
                    {
                        model: temoignage_1.Temoignage,
                        required: false,
                        attributes: ["corps", "date", "user_id"],
                        include: [
                            {
                                model: user_1.User,
                                as: "user",
                                required: false,
                                attributes: ["username"], // Les attributs que vous souhaitez inclure de l'utilisateur
                            },
                        ],
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
                                {
                                    model: image_1.Image,
                                    required: false,
                                    attributes: ["image", "image_id"],
                                },
                                {
                                    model: reaction_1.Reaction,
                                    required: false,
                                    attributes: ["type", "user_id"],
                                },
                                {
                                    model: temoignage_1.Temoignage,
                                    required: false,
                                    attributes: ["corps", "date", "user_id"],
                                    include: [
                                        {
                                            model: user_1.User,
                                            as: "user",
                                            required: false,
                                            attributes: ["username"], // Les attributs que vous souhaitez inclure de l'utilisateur
                                        },
                                    ],
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
router.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.body.search;
    console.log(searchTerm);
    try {
        //tina atao
        //SELECT *  FROM `publication`  LEFT JOIN `user`    ON `publication`.`user_id` = `user`.`user_id`  WHERE `publication`.`titre` LIKE '%iantso%'     OR `publication`.`description` LIKE '%iantso%'     OR `user`.`username` LIKE '%iantso%';
        if (searchTerm) {
            var publications = yield publication_1.Publication.findAll({
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
                    {
                        model: image_1.Image,
                        required: false,
                        attributes: ["image", "image_id"],
                    },
                    {
                        model: reaction_1.Reaction,
                        required: false,
                        attributes: ["type", "user_id"],
                    },
                    {
                        model: temoignage_1.Temoignage,
                        required: false,
                        attributes: ["corps", "date", "user_id"],
                        include: [
                            {
                                model: user_1.User,
                                as: "user",
                                required: false,
                                attributes: ["username"], // Les attributs que vous souhaitez inclure de l'utilisateur
                            },
                        ],
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
                        where: { user_id: parseInt(searchTerm, 10) },
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
                                {
                                    model: image_1.Image,
                                    required: false,
                                    attributes: ["image", "image_id"],
                                },
                                {
                                    model: reaction_1.Reaction,
                                    required: false,
                                    attributes: ["type", "user_id"],
                                },
                                {
                                    model: temoignage_1.Temoignage,
                                    required: false,
                                    attributes: ["corps", "date", "user_id"],
                                    include: [
                                        {
                                            model: user_1.User,
                                            as: "user",
                                            required: false,
                                            attributes: ["username"], // Les attributs que vous souhaitez inclure de l'utilisateur
                                        },
                                    ],
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
router.post("/delete/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = req.body.pub_id;
    try {
        const Notifs = yield notification_1.Notification.findOne({
            where: { pub_id: pubId },
        });
        Notifs === null || Notifs === void 0 ? void 0 : Notifs.destroy();
        yield image_1.Image.destroy({ where: { pub_id: pubId } });
        yield reaction_1.Reaction.destroy({ where: { pub_id: pubId } });
        yield temoignage_1.Temoignage.destroy({ where: { pub_id: pubId } });
        const result = yield publication_1.Publication.destroy({ where: { pub_id: pubId } });
        if (result > 0) {
            res.status(200).json({ message: "supprimé" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/create", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Req = req.body;
    try {
        if (Req.zone != null &&
            Req.description != null &&
            Req.titre != null &&
            Req.user_id) {
            if (Req.entreprise != null) {
                const pub = yield publication_1.Publication.create({
                    user_id: Req.user_id,
                    zone: Req.zone,
                    description: Req.description,
                    titre: Req.titre,
                    entreprise: Req.entreprise,
                });
                yield notification_1.Notification.create({
                    pub_id: pub.pub_id,
                    user_id: pub.user_id,
                });
                if (!req.file) {
                }
                if (req.file != undefined) {
                    yield image_1.Image.create({
                        pub_id: pub.pub_id,
                        image: `https://ifm.onrender.com:3000/Images/${req.file.filename}`,
                    });
                }
            }
            else {
                const pub = yield publication_1.Publication.create({
                    user_id: Req.user_id,
                    zone: Req.zone,
                    description: Req.description,
                    titre: Req.titre,
                });
                yield notification_1.Notification.create({
                    pub_id: pub.pub_id,
                    user_id: pub.user_id,
                });
            }
            res.status(200).json({ message: "Publication créé" });
        }
        else {
            res.status(202).json("Champ vide impossible de creer");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
