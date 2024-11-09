import { Router, Response, Request } from "express";
import { Publication } from "../Models/publication";
import { Op } from "sequelize";
import { User } from "../Models/user";
import { Image } from "../Models/image";
import { Reaction } from "../Models/reaction";
import { Temoignage } from "../Models/temoignage";
import { Notification } from "../Models/notification";
import { Lecture } from "../Models/lecture";
import path from "path";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, path.join(__dirname, "../Images")); // Chemin relatif au projet
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const fileExtension = path.extname(file.originalname);
    const newFileName = `image_${timestamp}${fileExtension}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

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
              as: "user",
              required: false,
              attributes: ["username"],
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

router.post("/Find/", async (req: Request, res: Response) => {
  const Req = req.body;
  const factId = Req.pub_id;
  try {
    const response = await Publication.findOne({
      where: { pub_id: factId },
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

router.post("/delete/", async (req: Request, res: Response) => {
  const pubId = req.body.pub_id;
  try {
    const Notifs = await Notification.findOne({
      where: { pub_id: pubId },
    });
    Notifs?.destroy();
    await Image.destroy({ where: { pub_id: pubId } });
    await Reaction.destroy({ where: { pub_id: pubId } });
    await Temoignage.destroy({ where: { pub_id: pubId } });
    const result = await Publication.destroy({ where: { pub_id: pubId } });
    if (result > 0) {
      res.status(200).json({ message: "supprimé" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post(
  "/create",
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    const Req = req.body;
    try {
      if (
        Req.zone != null &&
        Req.description != null &&
        Req.titre != null &&
        Req.user_id
      ) {
        if (Req.entreprise != null) {
          const pub = await Publication.create({
            user_id: Req.user_id,
            zone: Req.zone,
            description: Req.description,
            titre: Req.titre,
            entreprise: Req.entreprise,
          } as Publication);

          await Notification.create({
            pub_id: pub.pub_id,
            user_id: pub.user_id,
          } as Notification);

          if (!req.file) {
          }
          if (req.file != undefined) {
            await Image.create({
              pub_id: pub.pub_id,
              image: `http://192.168.1.152:3000/Images/${req.file.filename}`,
            } as Image);
          }
        } else {
          const pub = await Publication.create({
            user_id: Req.user_id,
            zone: Req.zone,
            description: Req.description,
            titre: Req.titre,
          } as Publication);
          await Notification.create({
            pub_id: pub.pub_id,
            user_id: pub.user_id,
          } as Notification);
        }
        res.status(200).json({ message: "Publication créé" });
      } else {
        res.status(202).json("Champ vide impossible de creer");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default router;
