const express = require('express');
const usuarioController = require('../controllers/usuarioController');

// Camada de rotas: apenas liga verbo HTTP + caminho à função do Controller.
const router = express.Router();

router.get('/', usuarioController.listar);
router.post('/', usuarioController.criar);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.remover);

module.exports = router;
