import { Router, Response, Request } from "express";
import { Facts } from "../Models/facts";
const router = Router();

router.get("/list", async (res: Response) => {
  try {
    const response = await Facts.findAll();
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
    const response = await Facts.findOne({ where: { fact_id: factId } });
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

  const formattedDate = currentDate.toLocaleString("fr-MG", {
    hour12: false,
    timeZone: "Indian/Antananarivo",
  });

  console.log(formattedDate);

  const Req = req.body;
  try {
    if (Req.libelle != null && Req.user_id != null && Req.zone != null) {
      const newFacts = await Facts.create({
        libelle: Req.libelle,
        id_user: Req.user_id,
        fact_date: new Date(formattedDate),
        zone: Req.zone,
      } as Facts);
      res.status(200).json({ message: "Fait créé" });
    } else {
      res.status(202).json({ message: "Champ vide impossible de creer" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
