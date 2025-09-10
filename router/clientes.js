// rotas do cliente para inserir, listar, atualizar e remover clientes

const express = require('express');
const router = express.Router();
const path = require('path');
const Cliente = require('../models/Cliente');

// Rota para inserir um novo cliente

router.post('/cadastrar', (req, res) => { 
    const { nomeSobrenome, email, telefone, mensagem, contato, opcao, novidadeEmail } = req.body;

    const cliente = new Cliente(nomeSobrenome, email, telefone, mensagem, contato, opcao, novidadeEmail);

    cliente.salvar()
        .then(() => res.send('Cliente cadastrado com sucesso!'))
        .catch(err => res.status(500).send('Erro ao cadastrar cliente: ' + err));
});


// Rota para listar todos os clientes utilizando fetch
router.get('/listar', (req, res) => {
  Cliente.listar()
    .then(clientes => res.json(clientes)) // agora já é um array simples
    .catch(err => res.status(500).send('Erro ao listar clientes: ' + err));
});

//rota para excluir cliente
router.delete('/excluir/:id', (req, res) => {
  const id = req.params.id;

  Cliente.excluir(id)
    .then(() => res.send("Cliente excluído com sucesso!"))
    .catch(err => res.status(500).send("Erro ao excluir cliente: " + err));
});


//Rota para minha página index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//Rota para minha página produto.html
router.get('/produto', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/produto.html'));
});

//Rota para minha página contato.html
router.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/contato.html'));
});

module.exports = router;


