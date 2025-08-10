//configuração do servidor usando express e dotenv
require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const app = express();

// importando a conexão com o banco de dados
const db = require('./database/connection');


// confifurando o servidor utiliznd express e dotenv e variaveis de ambiente


app.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`)
});


// testando a configuração do servidor
app.get('/', (req, res) => {
    res.send('Servidor está funcionando corretamente!');
});