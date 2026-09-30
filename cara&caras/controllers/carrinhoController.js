import {
    listarCarrinho,
    buscarCarrinho,
    adicionarCarrinho,
    atualizarCarrinho,
    excluirCarrinho
} from "../models/carrinhoModel.js";

export async function getCarrinho(req, res) {
    try {
        const carrinho = await listarCarrinho();
        res.json(carrinho);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar carrinho" });
    }
}

export async function getItemCarrinho(req, res) {
    try {
        const item = await buscarCarrinho(req.params.id);

        if (!item) {
            return res.status(404).json({
                erro: "Item não encontrado"
            });
        }

        res.json(item);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar item" });
    }
}

export async function postCarrinho(req, res) {
    try {
        const {
            artigo,
            quantidade,
            id_usuario,
            id_artigo
        } = req.body;

        const item = await adicionarCarrinho(
            artigo,
            quantidade,
            id_usuario,
            id_artigo
        );

        res.status(201).json(item);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao adicionar ao carrinho" });
    }
}

export async function putCarrinho(req, res) {
    try {
        const { quantidade } = req.body;

        const item = await atualizarCarrinho(
            req.params.id,
            quantidade
        );

        if (!item) {
            return res.status(404).json({
                erro: "Item não encontrado"
            });
        }

        res.json(item);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar carrinho" });
    }
}

export async function deleteCarrinho(req, res) {
    try {
        const item = await excluirCarrinho(req.params.id);

        if (!item) {
            return res.status(404).json({
                erro: "Item não encontrado"
            });
        }

        res.json({
            mensagem: "Item removido do carrinho"
        });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao remover item" });
    }
}