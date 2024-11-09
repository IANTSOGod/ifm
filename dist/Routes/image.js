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
const image_1 = require("../Models/image");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../Images')); // Chemin relatif au projet
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const fileExtension = path_1.default.extname(file.originalname);
        const newFileName = `image_${timestamp}${fileExtension}`;
        cb(null, newFileName);
    }
});
const router = (0, express_1.Router)();
router.get("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield image_1.Image.findAll();
        if (response) {
            res.status(200).json(response);
        }
        else {
            res.status(409).json({ message: "Aucune image actuellement" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
const upload = (0, multer_1.default)({ storage });
// Définition de la route pour l'upload
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }
    if (req.file != undefined) {
        res.send(`Image téléchargée avec succès sous le nom : ${req.file.filename}`);
    }
});
exports.default = router;
