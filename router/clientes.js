// rotas do cliente para inserir, listar, atualizar e remover clientes

const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Rota para inserir um novo cliente

router.post('/cadastrar', (req, res) => { 
    const { nomeSobrenome, email, telefone, mensagem, contato, opcao, novidadeEmail } = req.body;

    const cliente = new Cliente(nomeSobrenome, email, telefone, mensagem, contato, opcao, novidadeEmail);

    cliente.salvar()
        .then(() => res.send('Cliente cadastrado com sucesso!'))
        .catch(err => res.status(500).send('Erro ao cadastrar cliente: ' + err));
});

//Rota para minha página index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;


