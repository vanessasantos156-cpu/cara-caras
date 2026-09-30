import pool from "../config/database.js";

export async function listarUsuarios() {
    const resultado = await pool.query(
        "SELECT * FROM usuario"
    );

    return resultado.rows;
}

export async function buscarUsuario(id) {
    const resultado = await pool.query(
        "SELECT * FROM usuario WHERE id = $1",
        [id]
    );

    return resultado.rows[0];
}

export async function criarUsuario(nome, email) {
    const resultado = await pool.query(
        `INSERT INTO usuario (id, nome, email)
         VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM usuario), $1, $2)
         RETURNING *`,
        [nome, email]
    );

    return resultado.rows[0];
}

export async function atualizarUsuario(id, nome, email) {
    const resultado = await pool.query(
        `UPDATE usuario
         SET nome = $1, email = $2
         WHERE id = $3
         RETURNING *`,
        [nome, email, id]
    );

    return resultado.rows[0];
}

export async function excluirUsuario(id) {
    const resultado = await pool.query(
        "DELETE FROM usuario WHERE id = $1 RETURNING *",
        [id]
    );

    return resultado.rows[0];
}