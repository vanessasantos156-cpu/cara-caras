import {
    listarUsuarios,
    buscarUsuario,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario
} from "../models/usuarioModel.js";

export async function getUsuarios(req, res) {
    try {
        const usuarios = await listarUsuarios();
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar usuários" });
    }
}

export async function getUsuario(req, res) {
    try {
        const usuario = await buscarUsuario(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        res.json(usuario);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
}

export async function postUsuario(req, res) {
    try {
        const { nome, email } = req.body;

        const usuario = await criarUsuario(nome, email);

        res.status(201).json(usuario);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao cadastrar usuário" });
    }
}

export async function putUsuario(req, res) {
    try {
        const { nome, email } = req.body;

        const usuario = await atualizarUsuario(
            req.params.id,
            nome,
            email
        );

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        res.json(usuario);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
}

export async function deleteUsuario(req, res) {
    try {
        const usuario = await excluirUsuario(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        res.json({
            mensagem: "Usuário excluído com sucesso"
        });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao excluir usuário" });
    }
}