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



// Método para listar todos os clientes
static listar() {
  return db.promise()
    .query(`SELECT * FROM cliente`)
    .then(([rows]) => rows); // pega só os dados, ignora "fields"
}

// Método para excluir um cliente pelo ID
 static excluir(id) {
  return db.promise().execute("DELETE FROM cliente WHERE id = ?", [id]);
}

// Método para buscar um cliente pelo ID
static buscarPorId(id) {
  return db.promise()
    .query("SELECT * FROM cliente WHERE id = ?", [id])
    .then(([rows]) => rows[0]); // retorna o primeiro resultado ou seja só um cliente
  
}

// Método para buscar um cliente pelo nome
static buscarPorNome(nomeSobrenome) {
  return db.promise()
    .query("SELECT * FROM cliente WHERE nomeSobrenome LIKE ?", [`%${nomeSobrenome}%`])
    .then(([rows]) => rows); // retorna todos os resultados que correspondem ao nome

}

 // Método para atualizar um cliente pelo ID
static atualizar(id, dadosAtualizados) {
  const { nomeSobrenome, email, telefone, mensagem, contato, opcao, novidadeEmail } = dadosAtualizados;
  return db.promise().execute(
    `UPDATE cliente SET 
       nomeSobrenome = ?, email = ?, telefone = ?, mensagem = ?, contato = ?, opcao = ?, novidadeEmail = ? 
     WHERE id = ?`,
    [
      nomeSobrenome,
      email,
      telefone,
      mensagem,
      contato,
      opcao,
      novidadeEmail ? 1 : 0,
      id
    ]
  );
}

}                     

module.exports = Cliente;
