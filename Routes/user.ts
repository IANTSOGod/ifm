import { Router, Request, Response } from "express";
import { User } from "../Models/user";

const router = Router();

router.get("/api/", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error as string });
  }
});

router.post("/api/auth", async (req: Request, res: Response) => {
  const Req = req.body;

  try {
    const users = await User.findAll({
      where: { username: Req.username },
    });

    if (users.length > 0) {
      const usersWithValidPassword = users.filter(
        (user) => user.mdp === Req.mdp
      );

      if (usersWithValidPassword.length === 1) {
        res.status(200).json(usersWithValidPassword[0]);
      } else if (usersWithValidPassword.length > 1) {
        res.status(409).json({
          message: "Plusieurs utilisateurs avec le même mot de passe trouvés",
        });
      } else {
        res.status(401).json({ message: "Mot de passe incorrect" });
      }
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur du serveur", error });
  }
});

router.post("/api/create", async (req: Request, res: Response) => {
  const Req = req.body;

  try {
    if (Req.username && Req.mdp) {
      const newUser = await User.create({
        username: Req.username,
        mdp: Req.mdp,
      } as User);

      res.status(201).json(newUser);
    } else {
      res
        .status(400)
        .json({ message: "Nom d'utilisateur et mot de passe sont requis." });
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res.status(500).json(error);
  }
});

router.delete("/api/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const deletedCount = await User.destroy({ where: { user_id: userId } });
    if (deletedCount > 0) {
      res.status(200).json({ message: "Utilisateur supprimé" });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: error as string });
  }
});

router.post("/api/modify/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const Req = req.body;
  try {
    const selectedUser = await User.findOne({ where: { user_id: userId } });
    if (selectedUser) {
      if (Req.username != null && Req.CIN != null && Req.num_phone != null) {
        selectedUser.username = Req.username;
        selectedUser.num_phone = Req.num_phone;
        selectedUser.CIN = Req.CIN;
      }
      await selectedUser.save();
      res.status(200).json({ message: "Les modifications on réussi" });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/api/GetPassword/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const response = await User.findOne({ where: { user_id: userId } });
    if (response) {
      res.status(200).json({ password: response.mdp });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/api/GetUsername/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const response = await User.findOne({ where: { user_id: userId } });
    if (response) {
      res.status(200).json({ username: response.username });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/api/GetCIN/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const response = await User.findOne({ where: { user_id: userId } });
    if (response) {
      res.status(200).json({ CIN: response.CIN });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


router.post("/api/GetNum/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const response = await User.findOne({ where: { user_id: userId } });
    if (response) {
      res.status(200).json({ num_phone: response.num_phone });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
