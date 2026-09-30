import {
    listarArtigos,
    buscarArtigo,
    criarArtigo,
    atualizarArtigo,
    excluirArtigo
} from "../models/artigosModel.js";

export async function getArtigos(req, res) {
    try {
        const artigos = await listarArtigos();
        res.json(artigos);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar artigos" });
    }
}

export async function getArtigo(req, res) {
    try {
        const artigo = await buscarArtigo(req.params.id);

        if (!artigo) {
            return res.status(404).json({
                erro: "Artigo não encontrado"
            });
        }

        res.json(artigo);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar artigo" });
    }
}

export async function postArtigo(req, res) {
    try {
        const { nome, preco, categoria } = req.body;

        const artigo = await criarArtigo(
            nome,
            preco,
            categoria
        );

        res.status(201).json(artigo);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao cadastrar artigo" });
    }
}

export async function putArtigo(req, res) {
    try {
        const { nome, preco, categoria } = req.body;

        const artigo = await atualizarArtigo(
            req.params.id,
            nome,
            preco,
            categoria
        );

        if (!artigo) {
            return res.status(404).json({
                erro: "Artigo não encontrado"
            });
        }

        res.json(artigo);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar artigo" });
    }
}

export async function deleteArtigo(req, res) {
    try {
        const artigo = await excluirArtigo(req.params.id);

        if (!artigo) {
            return res.status(404).json({
                erro: "Artigo não encontrado"
            });
        }

        res.json({
            mensagem: "Artigo excluído com sucesso"
        });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao excluir artigo" });
    }
}