import pool from "../config/database.js";

export async function listarArtigos() {
    const resultado = await pool.query(
        "SELECT * FROM artigos"
    );

    return resultado.rows;
}

export async function buscarArtigo(id) {
    const resultado = await pool.query(
        "SELECT * FROM artigos WHERE id = $1",
        [id]
    );

    return resultado.rows[0];
}

export async function criarArtigo(nome, preco, categoria) {
    const resultado = await pool.query(
        `INSERT INTO artigos (id, nome, preco, categoria)
         VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM artigos), $1, $2, $3)
         RETURNING *`,
        [nome, preco, categoria]
    );

    return resultado.rows[0];
}

export async function atualizarArtigo(id, nome, preco, categoria) {
    const resultado = await pool.query(
        `UPDATE artigos
         SET nome = $1, preco = $2, categoria = $3
         WHERE id = $4
         RETURNING *`,
        [nome, preco, categoria, id]
    );

    return resultado.rows[0];
}

export async function excluirArtigo(id) {
    const resultado = await pool.query(
        "DELETE FROM artigos WHERE id = $1 RETURNING *",
        [id]
    );

    return resultado.rows[0];
}