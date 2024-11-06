import { Router, Response, Request } from "express";
import { Image } from "../Models/image";
const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  try {
    const response = await Image.findAll();
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(409).json({ message: "Aucune image actuellement" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
