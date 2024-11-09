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
const notification_1 = require("../Models/notification");
const sequelize_1 = require("sequelize");
const publication_1 = require("../Models/publication");
const router = (0, express_1.Router)();
router.post("/num/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Req = req.body;
    const userId = Req.user_id;
    try {
        if (userId != null) {
            const notifs = yield notification_1.Notification.findAll({
                where: { user_id: { [sequelize_1.Op.ne]: userId } },
                include: {
                    model: publication_1.Publication,
                    required: false,
                    attributes: ["titre"],
                },
            });
            res.status(200).json({ nombre: notifs.length, notification: notifs });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
