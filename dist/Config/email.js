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
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmail({ destination, subject, text }) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            //Mila ovaina le pass fa tsy mety mahazo mot de passe application za
            auth: {
                user: "briceprivat292@gmail.com",
                pass: "amge ozcj ogfc zese",
            },
        });
        const mailOptions = {
            to: destination,
            subject: subject,
            text: text,
        };
        try {
            const info = yield transporter.sendMail(mailOptions);
            console.log("Email envoyé avec succès : %s", info.messageId);
        }
        catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);
        }
    });
}
exports.default = sendEmail;
