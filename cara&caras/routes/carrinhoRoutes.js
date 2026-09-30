import express from "express";

import {
    getCarrinho,
    getItemCarrinho,
    postCarrinho,
    putCarrinho,
    deleteCarrinho
} from "../controllers/carrinhoController.js";

const router = express.Router();

router.get("/", getCarrinho);
router.get("/:id", getItemCarrinho);
router.post("/", postCarrinho);
router.put("/:id", putCarrinho);
router.delete("/:id", deleteCarrinho);

export default router;
import express from "express";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import artigosRoutes from "./routes/artigosRoutes.js";
import carrinhoRoutes from "./routes/carrinhoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/artigos", artigosRoutes);
app.use("/api/carrinho", carrinhoRoutes);

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de maquiagem funcionando!"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});