import { Router, Response, Request } from "express";
import { Reaction } from "../Models/reaction";
import { Publication } from "../Models/publication";
import { User } from "../Models/user";

const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  try {
    const response = await Reaction.findAll({
      include: [
        {
          model: Publication,
          required: false,
          attributes: ["titre", "description", "zone"],
        },
        {
          model: User,
          required: false,
          attributes: ["username"],
        },
      ],
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Aucune reaction" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/create", async (req: Request, res: Response) => {
  const Req = req.body;

  try {
    if (Req.pub_id != null && Req.user_id) {
      const find = await Reaction.findAll({
        where: { user_id: Req.user_id, pub_id: Req.pub_id },
      });
      if (find.length > 0) {
        await Reaction.destroy({
          where: { user_id: Req.user_id, pub_id: Req.pub_id },
        });
        res.status(200).json({ message: "Reaction supprimé" });
      } else {
        await Reaction.create({
          user_id: Req.user_id,
          pub_id: Req.pub_id,
        } as Reaction);
        res.status(200).json({ message: "Reaction ajouté" });
      }
    } else {
      res.status(202).json("Impossible de crée champ vide");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
