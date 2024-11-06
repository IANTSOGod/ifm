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

export default router;
