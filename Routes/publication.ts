import { Router, Response, Request } from "express";
import { Publication } from "../Models/publication";
const router = Router();

router.get("/list", async (res: Response) => {
  try {
    const response = await Publication.findAll();
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(409).json({ message: "Aucun faits dans la bd" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/Find/:id", async (req: Request, res: Response) => {
  const factId = parseInt(req.params.id, 10);
  try {
    const response = await Publication.findOne({ where: { pub_id: factId } });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Facts not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/Create", async (req: Request, res: Response) => {
  const currentDate = new Date();

  const Req = req.body;
  try {
    if (
      Req.titre != null &&
      Req.description != null &&
      Req.zone != null &&
      Req.user_id != null
    ) {
      const newFacts = await Publication.create({
        titre: Req.titre,
        user_id: Req.user_id,
        description: Req.description,
        date: currentDate,
        zone: Req.zone,
      } as Publication);
      res.status(200).json({ message: "Fait créé" });
    } else {
      res.status(202).json({ message: "Champ vide impossible de creer" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
