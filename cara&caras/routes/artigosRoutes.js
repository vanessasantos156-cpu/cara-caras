import express from "express";

import {
    getArtigos,
    getArtigo,
    postArtigo,
    putArtigo,
    deleteArtigo
} from "../controllers/artigosController.js";

const router = express.Router();

router.get("/", getArtigos);
router.get("/:id", getArtigo);
router.post("/", postArtigo);
router.put("/:id", putArtigo);
router.delete("/:id", deleteArtigo);

export default router;