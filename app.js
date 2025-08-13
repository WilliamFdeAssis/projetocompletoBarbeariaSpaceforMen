//configuração do servidor usando express e dotenv
require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// importando a conexão com o banco de dados
const db = require('./database/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configurando o servidor utilizando express e dotenv e variáveis de ambiente
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


// importando as rotas do cliente
const clientesRouter = require('./router/clientes');

//usando as rotas do cliente
app.use('/clientes', clientesRouter);





app.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`)
});


// testando a configuração do servidor
app.get('/', (req, res) => {
    res.send('Servidor está funcionando corretamente!');
});