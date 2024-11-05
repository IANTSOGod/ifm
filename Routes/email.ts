import { Router, Response, Request } from "express";
import sendEmail from "../Config/email";

const router = Router();

router.post("/api/send", (req: Request, res: Response) => {
  sendEmail({
    destination: "irazafindrazaka@mit-ua.mg",
    subject: "Envoi d'email",
    text: "Ceci est un test",
  });
});

export default router;
