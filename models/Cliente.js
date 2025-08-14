// importa conexão com banco de dados;
const db = require('../database/connection');

// importando o modelo Cliente

class Cliente {
  constructor(nomeSobrenome, email, telefone, mensagem, contato, opcao, novidadeEmail) {
    this.nomeSobrenome = nomeSobrenome;
    this.email = email;
    this.telefone = telefone;
    this.mensagem = mensagem;
    this.contato = contato;
    this.opcao = opcao;
    this.novidadeEmail = novidadeEmail ? 1 : 0; // Converte para 1 ou 0
  }

    // Método para salvar o cliente no banco de dados
  salvar() {
    return db.promise().execute(
      `INSERT INTO cliente 
        (nomeSobrenome, email, telefone, mensagem, contato, opcao, novidadeEmail) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        this.nomeSobrenome,
        this.email,
        this.telefone,
        this.mensagem,
        this.contato,
        this.opcao,
        this.novidadeEmail
      ]
    );
  }

}

module.exports = Cliente;
