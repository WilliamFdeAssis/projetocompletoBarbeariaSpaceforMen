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
        .then(() => res.redirect('/contato.html')) // redireciona para a página de contato após o cadastro
        .catch(err => res.status(500).send('Erro ao cadastrar cliente: ' + err));
});


// Rota para listar todos os clientes utilizando fetch
router.get('/listar', (req, res) => {
  Cliente.listar()
    .then(clientes => res.json(clientes)) // agora já é um array simples
    .catch(err => res.status(500).send('Erro ao listar clientes: ' + err));
});


//rota de busca de cliente por id
router.get('/buscar/:id', (req, res) => {
  const id = req.params.id;

  Cliente.buscarPorId(id)
    .then(cliente => {
      if (cliente) {
        res.json(cliente);
      } else {
        res.status(404).send('Cliente não encontrado');
      }
    })
    .catch(err => res.status(500).send('Erro ao buscar cliente: ' + err));
});

//rota de busca de cliente por nome
router.get('/buscar/nome/:nomeSobrenome', (req, res) => {
  const nomeSobrenome = req.params.nomeSobrenome;

  Cliente.buscarPorNome(nomeSobrenome)
    .then(cliente => {
      if (cliente) {
        res.json(cliente);
      } else {
        res.status(404).send('Cliente não encontrado');
      }
    })
    .catch(err => res.status(500).send('Erro ao buscar cliente: ' + err));
});

//rota para excluir cliente
router.delete('/excluir/:id', (req, res) => {
  const id = req.params.id;

  Cliente.excluir(id)
    .then(() => res.send("Cliente excluído com sucesso!"))
    .catch(err => res.status(500).send("Erro ao excluir cliente: " + err));
});

// rota para atualizar cliente
router.put('/editar/:id', (req, res) => {
  const id = req.params.id;
  const { nomeSobrenome, email, telefone, mensagem, contato, opcao, novidadeEmail } = req.body;

  Cliente.atualizar(id, { nomeSobrenome, email, telefone, mensagem, contato, opcao, novidadeEmail })
    .then(() => res.send("Cliente atualizado com sucesso!"))
    .catch(err => res.status(500).send("Erro ao atualizar cliente: " + err));

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


