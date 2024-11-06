import { Router, Response, Request } from "express";
import sendEmail from "../Config/email";
import { User } from "../Models/user";
const router = Router();

router.post("/send", (req: Request, res: Response) => {
  try {
    sendEmail({
      destination: "irazafindrazaka@mit-ua.mg",
      subject: "Envoi d'email",
      text: "Ceci est un test",
    });
    res.status(200).json({ message: "Email envoyé" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/getUserPassword/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await User.findOne({ where: { user_id: userId } });
    if (user) {
      if (user.email != null) {
        sendEmail({
          destination: user.email as string,
          subject: `Récupération du mot de passe`,
          text: `Le mot de passe de ${user.username} dans anonymat est ${user.mdp}`,
        });
        res
          .status(200)
          .json({ message: "Votre mot de passe a été envoyé par email" });
      } else {
        res.status(404).json({ message: "Cet utilisateur n'a pas d'email" });
      }
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
