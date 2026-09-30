import pool from "../config/database.js";

export async function listarCarrinho() {
    const resultado = await pool.query(
        "SELECT * FROM carrinho"
    );

    return resultado.rows;
}

export async function buscarCarrinho(id) {
    const resultado = await pool.query(
        "SELECT * FROM carrinho WHERE id = $1",
        [id]
    );

    return resultado.rows[0];
}

export async function adicionarCarrinho(
    artigo,
    quantidade,
    id_usuario,
    id_artigo
) {
    const resultado = await pool.query(
        `INSERT INTO carrinho
        (id, artigo, quantidade, id_usuario, id_artigo)
        VALUES (
            (SELECT COALESCE(MAX(id), 0) + 1 FROM carrinho),
            $1, $2, $3, $4
        )
        RETURNING *`,
        [artigo, quantidade, id_usuario, id_artigo]
    );

    return resultado.rows[0];
}

export async function atualizarCarrinho(id, quantidade) {
    const resultado = await pool.query(
        `UPDATE carrinho
         SET quantidade = $1
         WHERE id = $2
         RETURNING *`,
        [quantidade, id]
    );

    return resultado.rows[0];
}

export async function excluirCarrinho(id) {
    const resultado = await pool.query(
        "DELETE FROM carrinho WHERE id = $1 RETURNING *",
        [id]
    );

    return resultado.rows[0];
}