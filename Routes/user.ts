import { Router, Request, Response } from "express";
import { User } from "../Models/user";
import assureUserUnique from "../Config/username.splitter";
import { Op } from "sequelize";
import Rnd from "../Config/randomize";

const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/search", async (req: Request, res: Response) => {
  const Req = req.body;
  const searchTerm = Req.search;
  try {
    const users = await User.findAll({
      where: { username: { [Op.like]: `%${searchTerm}%` } },
    });
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "Aucun utilisateur correspondant" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/auth", async (req: Request, res: Response) => {
  const Req = req.body;

  try {
    if (Req.query != null) {
      const users = await User.findAll({
        where: { username: Req.query },
      });

      if (users.length > 0) {
        const usersWithValidPassword = users.filter(
          (user) => user.mdp === Req.mdp
        );

        if (usersWithValidPassword.length === 1) {
          res.status(200).json(usersWithValidPassword[0]);
        } else if (usersWithValidPassword.length > 1) {
          res.status(202).json({
            message: "Plusieurs utilisateurs avec le même mot de passe trouvés",
          });
        } else {
          res.status(401).json({ message: "Mot de passe incorrect" });
        }
      } else {
        const us = await User.findAll({
          where: { email: Req.query },
        });
        if (us.length > 0) {
          res.status(200).json(us);
        } else {
          res.status(404).json({ message: "Utilisateur non trouvé" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/authByGoogle", async (req: Request, res: Response) => {
  const Req = req.body;
  try {
    if (Req.email != null) {
      const user = await User.findOne({
        where: {
          email: Req.email,
        },
      });
      if (user) {
        res.status(200).json(user);
      } else {
        const str = Rnd(8);
        const usr = await User.create({
          email: Req.email,
          mdp: str,
          username: Req.name,
        } as User);
        res.status(200).json(usr);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/create", async (req: Request, res: Response) => {
  const Req = req.body;
  var usr = Req.username;
  const MDP = Req.mdp;
  try {
    if (usr && MDP) {
      var search = await User.findOne({ where: { username: usr } });

      while (search) {
        usr = assureUserUnique(usr);
        search = await User.findOne({ where: { username: usr } });
      }

      await User.create({
        username: usr,
        mdp: MDP,
      } as User);
      if (Req.username === usr) {
        res.status(201).json({ message: "Utilisateur crée" });
      } else {
        res.status(201).json({ message: `Utilisateur ${usr} crée` });
      }
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

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const deletedCount = await User.destroy({ where: { user_id: userId } });
    if (deletedCount > 0) {
      res.status(200).json({ message: "Utilisateur supprimé" });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/modify/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const Req = req.body;
  try {
    const selectedUser = await User.findOne({ where: { user_id: userId } });
    if (selectedUser) {
      selectedUser.CIN = Req.CIN != null ? Req.CIN : selectedUser.CIN;
      selectedUser.email = Req.email != null ? Req.email : selectedUser.email;
      selectedUser.num_phone =
        Req.num_phone != null ? Req.num_phone : selectedUser.num_phone;
      selectedUser.mdp = Req.mdp != null ? Req.mdp : selectedUser.mdp;
      if (Req.username != null) {
        var usr = Req.username;

        var search = await User.findOne({ where: { username: usr } });

        while (search) {
          usr = assureUserUnique(usr);
          search = await User.findOne({ where: { username: usr } });
        }
        selectedUser.username = usr;
      } else {
        selectedUser.username = selectedUser.username;
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

router.post("/GetPassword/:id", async (req: Request, res: Response) => {
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

router.post("/GetUsername/:id", async (req: Request, res: Response) => {
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

router.post("/GetCIN/:id", async (req: Request, res: Response) => {
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

router.post("/GetNum/:id", async (req: Request, res: Response) => {
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

router.post("/GetEmail/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const response = await User.findOne({ where: { user_id: userId } });
    if (response) {
      res.status(200).json({ email: response.email });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/Find/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const response = await User.findOne({ where: { user_id: userId } });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
