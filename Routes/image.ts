import { Router, Response, Request } from "express";
import { Image } from "../Models/image";
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({

  destination: (req:Request, file, cb) => {
    cb(null, path.join(__dirname, '../Images')); // Chemin relatif au projet
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const fileExtension = path.extname(file.originalname);
    const newFileName = `image_${timestamp}${fileExtension}`;
    cb(null, newFileName);
  }
  
});
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
const upload = multer({ storage });

// Définition de la route pour l'upload
router.post('/upload', upload.single('image'), (req: Request, res: Response): void =>{
  if (!req.file) {
    res.status(400).send('Aucun fichier n\'a été téléchargé.');
  }
  if(req.file!=undefined){
    res.send(`Image téléchargée avec succès sous le nom : ${req.file.filename}`)
  }
});

export default router;
