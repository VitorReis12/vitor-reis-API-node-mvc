const pool = require('../config/db');

// Camada Model: único lugar da aplicação que contém SQL.
// Todas as queries são parametrizadas (?) para evitar SQL Injection.
const usuarioModel = {
  async listar() {
    const [linhas] = await pool.query(
      'SELECT id, nome, email, criado_em FROM usuarios'
    );
    return linhas;
  },

  async criar({ nome, email }) {
    const [resultado] = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    return resultado.insertId;
  },

  // Retorna true se algum registro foi atualizado
  async atualizar(id, { nome, email }) {
    const [resultado] = await pool.query(
      'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
      [nome, email, id]
    );
    return resultado.affectedRows > 0;
  },

  // Retorna true se algum registro foi removido
  async remover(id) {
    const [resultado] = await pool.query(
      'DELETE FROM usuarios WHERE id = ?',
      [id]
    );
    return resultado.affectedRows > 0;
  },
};

module.exports = usuarioModel;
