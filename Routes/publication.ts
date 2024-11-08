import { Router, Response, Request } from "express";
import { Publication } from "../Models/publication";
import { Op } from "sequelize";
import { User } from "../Models/user";
import { Image } from "../Models/image";
import { Reaction } from "../Models/reaction";
import { Temoignage } from "../Models/temoignage";
import { Notification } from "../Models/notification";
import { Lecture } from "../Models/lecture";
const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  try {
    var response = await Publication.findAll({
      include: [
        {
          model: Image,
          required: false,
          attributes: ["image_id", "image"],
        },
        {
          model: User,
          required: false,
          attributes: ["username"],
        },
        {
          model: Reaction,
          required: false,
          attributes: ["type", "user_id"],
        },
        {
          model: Temoignage,
          required: false,
          attributes: ["corps", "date", "user_id"],
          include: [
            {
              model: User,
              as: "user", // Assurez-vous que l'alias est correctement configuré dans le modèle Temoignage
              required: false,
              attributes: ["username"], // Les attributs que vous souhaitez inclure de l'utilisateur
            },
          ],
        },
        {
          model: Notification,
          required: false,
          attributes: ["user_id", "pub_id"],
        },
      ],
    });

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
    const response = await Publication.findOne({
      where: { pub_id: factId },
      include: {
        model: User,
        required: false,
        attributes: ["username"],
      },
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Facts not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/searchByAll", async (req: Request, res: Response) => {
  const searchTerm = req.body.search;
  console.log(searchTerm);

  try {
    //tina atao
    //SELECT *  FROM `publication`  LEFT JOIN `user`    ON `publication`.`user_id` = `user`.`user_id`  WHERE `publication`.`titre` LIKE '%iantso%'     OR `publication`.`description` LIKE '%iantso%'     OR `user`.`username` LIKE '%iantso%';

    if (searchTerm) {
      var publications = await Publication.findAll({
        where: {
          [Op.or]: [
            { titre: { [Op.like]: `%${searchTerm}%` } },
            { description: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
        include: [
          {
            model: User,
            required: false,
            attributes: ["username"],
          },
          {
            model: Image,
            required: false,
            attributes: ["image", "image_id"],
          },
          {
            model: Reaction,
            required: false,
            attributes: ["type", "user_id"],
          },
          {
            model: Temoignage,
            required: false,
            attributes: ["corps", "date", "user_id"],
            include: [
              {
                model: User,
                as: "user", // Assurez-vous que l'alias est correctement configuré dans le modèle Temoignage
                required: false,
                attributes: ["username"], // Les attributs que vous souhaitez inclure de l'utilisateur
              },
            ],
          },
        ],
      });

      if (publications.length > 0) {
        console.log("ty le nandefa kai");
        res.status(200).json(publications);
      } else {
        try {
          const response = await User.findOne({
            where: { username: { [Op.like]: `%${searchTerm}%` } },
          });
          if (response) {
            const selectedId = response?.user_id;
            const resp = await Publication.findAll({
              where: {
                user_id: selectedId,
              },
              include: [
                {
                  model: User,
                  required: false,
                  attributes: ["username"],
                },
                {
                  model: Image,
                  required: false,
                  attributes: ["image", "image_id"],
                },
                {
                  model: Reaction,
                  required: false,
                  attributes: ["type", "user_id"],
                },
                {
                  model: Temoignage,
                  required: false,
                  attributes: ["corps", "date", "user_id"],
                  include: [
                    {
                      model: User,
                      as: "user", // Assurez-vous que l'alias est correctement configuré dans le modèle Temoignage
                      required: false,
                      attributes: ["username"], // Les attributs que vous souhaitez inclure de l'utilisateur
                    },
                  ],
                },
              ],
            });
            if (resp.length > 0) {
              console.log("tafiditra ato");
              res.status(200).json(resp);
            } else {
              res
                .status(404)
                .json({ message: "Aucune publication correspondante" });
            }
          } else {
            res
              .status(404)
              .json({ message: "Aucune publication correspondante" });
          }
        } catch (error) {
          res.status(500).json(error);
        }
      }
    } else {
      res.status(400).json({ message: "Le champ de recherche est requis" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

router.post("/search", async (req: Request, res: Response) => {
  const searchTerm = req.body.search;
  console.log(searchTerm);

  try {
    //tina atao
    //SELECT *  FROM `publication`  LEFT JOIN `user`    ON `publication`.`user_id` = `user`.`user_id`  WHERE `publication`.`titre` LIKE '%iantso%'     OR `publication`.`description` LIKE '%iantso%'     OR `user`.`username` LIKE '%iantso%';

    if (searchTerm) {
      var publications = await Publication.findAll({
        where: {
          [Op.or]: [
            { titre: { [Op.like]: `%${searchTerm}%` } },
            { description: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
        include: [
          {
            model: User,
            required: false,
            attributes: ["username"],
          },
          {
            model: Image,
            required: false,
            attributes: ["image", "image_id"],
          },
          {
            model: Reaction,
            required: false,
            attributes: ["type", "user_id"],
          },
          {
            model: Temoignage,
            required: false,
            attributes: ["corps", "date", "user_id"],
            include: [
              {
                model: User,
                as: "user", // Assurez-vous que l'alias est correctement configuré dans le modèle Temoignage
                required: false,
                attributes: ["username"], // Les attributs que vous souhaitez inclure de l'utilisateur
              },
            ],
          },
        ],
      });

      if (publications.length > 0) {
        console.log("ty le nandefa kai");
        res.status(200).json(publications);
      } else {
        try {
          const response = await User.findOne({
            where: { user_id: parseInt(searchTerm, 10) },
          });
          if (response) {
            const selectedId = response?.user_id;
            const resp = await Publication.findAll({
              where: {
                user_id: selectedId,
              },
              include: [
                {
                  model: User,
                  required: false,
                  attributes: ["username"],
                },
                {
                  model: Image,
                  required: false,
                  attributes: ["image", "image_id"],
                },
                {
                  model: Reaction,
                  required: false,
                  attributes: ["type", "user_id"],
                },
                {
                  model: Temoignage,
                  required: false,
                  attributes: ["corps", "date", "user_id"],
                  include: [
                    {
                      model: User,
                      as: "user", // Assurez-vous que l'alias est correctement configuré dans le modèle Temoignage
                      required: false,
                      attributes: ["username"], // Les attributs que vous souhaitez inclure de l'utilisateur
                    },
                  ],
                },
              ],
            });
            if (resp.length > 0) {
              console.log("tafiditra ato");
              res.status(200).json(resp);
            } else {
              res
                .status(404)
                .json({ message: "Aucune publication correspondante" });
            }
          } else {
            res
              .status(404)
              .json({ message: "Aucune publication correspondante" });
          }
        } catch (error) {
          res.status(500).json(error);
        }
      }
    } else {
      res.status(400).json({ message: "Le champ de recherche est requis" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const pubId = parseInt(req.params.id, 10);
  try {
    await Image.destroy({
      where: { pub_id: pubId },
    });
    await Reaction.destroy({
      where: { pub_id: pubId },
    });
    await Temoignage.destroy({
      where: { pub_id: pubId },
    });
    var notifToSuppr = [] as number[];
    const Notifs = await Notification.findAll({
      where: { pub_id: pubId },
    });
    Notifs.map((notif) => {
      notifToSuppr.push(notif.pub_id);
    });

    notifToSuppr.map(async (notif) => {
      await Lecture.destroy({
        where: { notif_id: notif },
      });
      await Notification.destroy({
        where: {
          notif_id: notif,
        },
      });
    });

    const destroyCount = await Publication.destroy({
      where: { pub_id: pubId },
    });

    if (destroyCount > 0) {
      res.status(200).json({ message: "La publication a été supprimé" });
    } else {
      res.status(404).json({ message: "Cette publication n'existe pas" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/create", async (req: Request, res: Response) => {
  const Req = req.body;
  try {
    if (
      Req.titre != null &&
      Req.description != null &&
      Req.zone != null &&
      Req.user_id != null
    ) {
      if (Req.entreprise != null) {
        const pub = await Publication.create({
          titre: Req.titre,
          user_id: Req.user_id,
          description: Req.description,
          zone: Req.zone,
          entreprise: Req.entreprise,
        } as Publication);

        await Notification.create({
          pub_id: pub.pub_id,
          user_id: pub.user_id,
        } as Notification);
      } else {
        const pub = await Publication.create({
          titre: Req.titre,
          user_id: Req.user_id,
          description: Req.description,
          zone: Req.zone,
        } as Publication);

        await Notification.create({
          pub_id: pub.pub_id,
          user_id: pub.user_id,
        } as Notification);
      }
      res.status(200).json({ message: "Fait créé" });
    } else {
      res.status(202).json({ message: "Champ vide impossible de creer" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
