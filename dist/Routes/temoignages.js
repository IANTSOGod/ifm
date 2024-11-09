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
const temoignage_1 = require("../Models/temoignage");
const router = (0, express_1.Router)();
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Req = req.body;
    try {
        if (Req.corps != null && Req.pub_id != null && Req.user_id) {
            yield temoignage_1.Temoignage.create({
                pub_id: parseInt(Req.pub_id, 10),
                user_id: parseInt(Req.user_id, 10),
                corps: Req.corps,
            });
            res.status(200).json({ message: "bien reçu" });
        }
        else {
            res.status(400).json({ message: "Champ incomplet" });
        }
    }
    catch (error) { }
}));
exports.default = router;
