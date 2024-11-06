import { Router, Response, Request } from "express";
import { Publication } from "../Models/publication";
import { Op } from "sequelize";
import { User } from "../Models/user";
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
router.post("/search", async (req: Request, res: Response) => {
  const searchTerm = req.body.search; // Récupère le terme de recherche depuis la requête
  console.log(searchTerm);

  try {
//tina atao 
//SELECT *  FROM `publication`  LEFT JOIN `user`    ON `publication`.`user_id` = `user`.`user_id`  WHERE `publication`.`titre` LIKE '%iantso%'     OR `publication`.`description` LIKE '%iantso%'     OR `user`.`username` LIKE '%iantso%';

    ///Amboarina 
    // if (searchTerm) {
    //   // Recherche des publications avec un LEFT JOIN sur l'utilisateur
    //   const publications = await Publication.findAll({
    //     where: {
    //       [Op.or]: [
    //         { titre: { [Op.like]: `%${searchTerm}%` } }, // Recherche dans le titre
    //         { description: { [Op.like]: `%${searchTerm}%` } }, // Recherche dans la description
    //       ],
    //     },
    //     include: [
    //       {
    //         model: User,
    //         required: false, // Utilisation de LEFT JOIN
    //         where: {
    //           [Op.or]: [
    //             { username: { [Op.like]: `%${searchTerm}%` } }, // Recherche dans le username de l'utilisateur
    //           ],
    //         },
    //         attributes: ["username"], // Seul le champ `username` est récupéré de la table `user`
    //       },
    //     ],
    //   });

    //   // Si des publications sont trouvées, les renvoyer
    //   if (publications.length > 0) {
    //     res.status(200).json(publications);
    //   } else {
    //     res.status(404).json({ message: "Aucune publication trouvée" });
    //   }
    // } else {
    //   res.status(400).json({ message: "Le champ de recherche est requis" });
    // }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
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
