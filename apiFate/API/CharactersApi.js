import express from "express";
import { token } from "morgan";
const router = express.Router();
const multer = require("multer");
import path from "path";
import { verificarAuth } from "../middlewares/autenticacion";
const { v4: uuidv4 } = require("uuid");
import CharacterModel from "../models/CharactersModel";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const filename = uuidv4() + file.originalname; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    cb(null, filename);
  },
  destination: "public/uploads",
});
const upload = multer({
  dest: "public/uploads",
  storage,
  limits: { fileSize: 3000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png|bmp|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimetype === extname) {
      return cb(null, true);
    }
    cb("El archivo debe ser una imágen válida: jpg|jpeg|png|bmp|gif");
  },
});

// Agregar una PErsonaje
router.post("/create-character", [verificarAuth], async (req, res) => {
  const char = req.body;

  console.log(char);
  try {
    const createCharacter = await CharacterModel.create(char);
    res.status(200).json({ message: "Personaje guardado" });
  } catch (error) {
    res.status(500).json({ message: "El personaje no se pudo guardar", error });
  }

  //console.log(req.file);
});

// Get con parámetros
router.get("/read/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Nota.findOne({ _id });
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Get con todos los personajes del usuario
router.get("/get-characters/:userId", [verificarAuth], async (req, res) => {
  const id = req.params.userId;
  console.log("userId", id);
  try {
    const characterDB = await CharacterModel.find({ userId: id });
    res.json(characterDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Delete eliminar una nota
router.delete("/delete/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const notaDb = await Nota.findByIdAndDelete({ _id });
    if (!notaDb) {
      return res.status(400).json({
        mensaje: "No se encontró el id indicado",
        error,
      });
    }
    res.json(notaDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Put actualizar una nota
router.put("/update/:id", async (req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const notaDb = await Nota.findByIdAndUpdate(_id, body, { new: true });
    res.json(notaDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Exportación de router
module.exports = router;
