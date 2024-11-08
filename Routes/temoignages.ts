import { Router, Response, Request } from "express";
import { Temoignage } from "../Models/temoignage";

const router = Router();
router.post("/create", async (req: Request, res: Response) => {
  const Req = req.body;
  try {
    if (Req.corps != null && Req.pub_id != null && Req.user_id) {
      await Temoignage.create({
        pub_id: parseInt(Req.pub_id, 10),
        user_id: parseInt(Req.user_id, 10),
        corps: Req.corps,
      } as Temoignage);
      res.status(200).json({ message: "créé" });
    } else {
      res.status(400).json({ message: "Champ incomplet" });
    }
  } catch (error) {}
});
export default router;
