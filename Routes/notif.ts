import { Router, Response, Request } from "express";
import { Notification } from "../Models/notification";
import { Op } from "sequelize";
import { Publication } from "../Models/publication";

const router = Router();

router.post("/num/", async (req: Request, res: Response) => {
  const Req = req.body;
  const userId = Req.user_id;
  try {
    if (userId != null) {
      const notifs = await Notification.findAll({
        where: { user_id: { [Op.ne]: userId } },
        include: {
          model: Publication,
          required: false,
          attributes: ["titre"],
        },
      });
      res.status(200).json({ nombre: notifs.length, notification: notifs });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
