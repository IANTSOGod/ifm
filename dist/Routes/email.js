"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_1 = __importDefault(require("../Config/email"));
const router = (0, express_1.Router)();
router.post("/api/send", (req, res) => {
    (0, email_1.default)({
        source: "iantsochristianrazafindrazaka@gmail.com",
        destination: "irazafindrazaka@mit-ua.mg",
        subject: "Envoi d'email",
        text: "Ceci est un test",
    });
});
exports.default = router;
