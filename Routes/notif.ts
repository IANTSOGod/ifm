import { Router, Response, Request } from "express";
import { Notification } from "../Models/notification";
import { Op } from "sequelize";

const router = Router();
router.get("/num/:id", async (req: Request, res: Response) => {
    
  const userId = parseInt(req.params.id, 10);
  try {
    if (userId != null) {
      const notifs = await Notification.findAll({
        where: { user_id: { [Op.ne]: userId } },
      });
      res.status(200).json({ nombre: notifs.length, notification: notifs });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
