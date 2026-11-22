const usuarioModel = require('../models/usuarioModel');

// Camada Controller: valida a entrada, chama o Model e devolve a resposta JSON (a "View" da API).
const usuarioController = {
  async listar(req, res) {
    try {
      const usuarios = await usuarioModel.listar();
      return res.status(200).json(usuarios);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: 'Erro interno ao listar usuários.' });
    }
  },

  async criar(req, res) {
    try {
      const { nome, email } = req.body;

      if (!nome || !email) {
        return res.status(400).json({ erro: 'Os campos nome e email são obrigatórios.' });
      }

      const id = await usuarioModel.criar({ nome, email });

      return res.status(201).json({
        mensagem: 'Usuário criado com sucesso.',
        id,
        nome,
        email,
      });
    } catch (erro) {
      if (erro.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ erro: 'Já existe um usuário com este e-mail.' });
      }
      console.error(erro);
      return res.status(500).json({ erro: 'Erro interno ao inserir usuário.' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;

      if (!nome || !email) {
        return res.status(400).json({ erro: 'Os campos nome e email são obrigatórios.' });
      }

      const atualizado = await usuarioModel.atualizar(id, { nome, email });

      if (!atualizado) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      return res.status(200).json({
        mensagem: 'Usuário atualizado com sucesso.',
        id: Number(id),
        nome,
        email,
      });
    } catch (erro) {
      if (erro.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ erro: 'Já existe um usuário com este e-mail.' });
      }
      console.error(erro);
      return res.status(500).json({ erro: 'Erro interno ao atualizar usuário.' });
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;

      const removido = await usuarioModel.remover(id);

      if (!removido) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      return res.status(200).json({ mensagem: 'Usuário removido com sucesso.' });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: 'Erro interno ao remover usuário.' });
    }
  },
};

module.exports = usuarioController;
