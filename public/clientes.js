/* Carregar todos os clientes ao carregar a página */

document.addEventListener("DOMContentLoaded", () => {
  fetch("/clientes/listar")
    .then(response => response.json())
    .then(clientes => preencherTabela(clientes)) // ✅ mostra todos
    .catch(err => console.error("Erro ao carregar clientes:", err));
});

/* Buscar cliente por ID */
function buscarPorId() {
  const id = document.getElementById("id").value;
  if (!id) {
    alert("Digite um ID válido!");
    return;
  }

  fetch(`/clientes/buscar/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Cliente não encontrado");
      return res.json();
    })
    .then(cliente => preencherTabela([cliente])) // ✅ reaproveita
    .catch(err => alert(err.message));
}


 /* Buscar clientes por Nome */
function buscarPorNome() {
  const nome = document.getElementById("nome").value.trim();
  if (!nome) {
    alert("Digite um nome válido!");
    return;
  }

  fetch(`/clientes/buscar/nome/${nome}`)
    .then(res => {
      if (!res.ok) throw new Error("Nenhum cliente encontrado com esse nome");
      return res.json();
    })
    .then(clientes => preencherTabela(clientes)) // ✅ reaproveita
    .catch(err => alert(err.message));
}

// 🔄 Função para buscar todos os clientes
function carregarClientes() {
  fetch("/clientes/listar")
    .then(response => response.json())
    .then(clientes => preencherTabela(clientes))
    .catch(err => console.error("Erro ao carregar clientes:", err));
}




/* Função para preencher tabela de clientes */
function preencherTabela(clientes) {
  const tabela = document.getElementById("tabela-clientes");
  tabela.innerHTML = ""; // limpa a tabela antes de preencher

  clientes.forEach(cliente => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${cliente.id}</td>
      <td>${cliente.nomeSobrenome}</td>
      <td>${cliente.email}</td>
      <td class="nowrap">${cliente.telefone}</td>
      <td>${cliente.mensagem}</td>
      <td>${cliente.contato}</td>
      <td>${cliente.opcao}</td>
      <td class="acoes">
        <button class="btn editar">Editar</button>
        <button class="btn deletar">Excluir</button>
      </td>
      <td><input type="checkbox" ${cliente.novidadeEmail ? "checked" : ""}></td>
    `;

    // 🔹 Adiciona evento de excluir em todos os clientes

    // 1. Seleciona o botão "Excluir" dentro da linha (row) do cliente
    const btnExcluir = row.querySelector(".deletar");

    // 2. Adiciona um "ouvinte" de evento de clique no botão Excluir
    btnExcluir.addEventListener("click", () => {

      // 3. Mostra uma caixa de confirmação antes de excluir
      //    O nome do cliente aparece na mensagem para evitar exclusão acidental
      if (confirm(`Tem certeza que deseja excluir o cliente ${cliente.nomeSobrenome}?`)) {

        // 4. Faz uma requisição HTTP DELETE para o backend
        //    A rota "/clientes/excluir/:id" vai excluir o cliente pelo ID
        fetch(`/clientes/excluir/${cliente.id}`, { method: "DELETE" })

          // 5. Quando a resposta voltar, verificamos se deu certo
          .then(res => {
            if (res.ok) {
              // 5.1. Se o servidor respondeu OK, mostra mensagem de sucesso
              alert("Cliente excluído com sucesso!");

              // 5.2. Remove a linha da tabela no navegador, sem precisar recarregar a página
              row.remove();
            } else {
              // 5.3. Se deu erro no servidor, mostra aviso ao usuário
              alert("Erro ao excluir cliente.");
            }
          })

          // 6. Caso aconteça algum erro inesperado na requisição, mostramos no console
          .catch(err => console.error("Erro na exclusão:", err));
      }
    });

  // 🔹 Adiciona evento de editar em todos os clientes
    const btnEditar = row.querySelector(".editar");
    btnEditar.addEventListener("click", () => {
      // Redireciona para a página de edição com o ID do cliente na URL
      window.location.href = `/formeditar.html?id=${cliente.id}`;

      


    });







    
    tabela.appendChild(row);
  });




}

// 🔹 Este código deve estar no arquivo clientes.js (fora da função preencherTabela)

// 1. Espera o HTML carregar totalmente antes de rodar o JavaScript
document.addEventListener("DOMContentLoaded", () => {
  
  // 2. Procura o formulário de edição na página
  const formEditar = document.getElementById('form-editar');

  // 3. Se não existir formulário de edição (ex: estamos em clientes.html), 
  //    o código para aqui e não continua
  if (!formEditar) return;

  // 4. Pega os parâmetros da URL (ex: formeditar.html?id=5)
  const params = new URLSearchParams(window.location.search);

  // 5. Busca o valor do parâmetro "id" da URL
  const id = params.get('id');

  // 6. Se não tiver "id" na URL, mostra erro e volta para a lista de clientes
  if (!id) {
    alert("ID do cliente não informado!");
    window.location.href = "/clientes.html";
    return;
  }

  // 7. Faz requisição ao backend para buscar os dados do cliente pelo ID
  fetch(`/clientes/buscar/${id}`)
    .then(res => res.json()) // converte a resposta em JSON
    .then(cliente => {
      // 8. Preenche o formulário com os dados que vieram do backend
      document.getElementById('edit-id').value = cliente.id;
      document.getElementById('edit-nome').value = cliente.nomeSobrenome || "";
      document.getElementById('edit-email').value = cliente.email || "";
      document.getElementById('edit-telefone').value = cliente.telefone || "";
      document.getElementById('edit-mensagem').value = cliente.mensagem || "";
      document.getElementById('edit-contato').value = cliente.contato || "email";
      document.getElementById('edit-opcao').value = cliente.opcao || "";
      document.getElementById('edit-novidade').checked = cliente.novidadeEmail == 1;
    })
    .catch(() => {
      // 9. Se o cliente não for encontrado ou ocorrer erro, 
      //    mostra alerta e volta para a lista
      alert("Cliente não encontrado!");
      window.location.href = "/clientes.html";
    });

  // 10. Captura o evento de envio do formulário de edição
  formEditar.addEventListener('submit', function(e) {
    e.preventDefault(); // impede que a página recarregue automaticamente

    // 11. Pega os valores digitados pelo usuário nos campos do formulário
    const dados = {
      nomeSobrenome: document.getElementById('edit-nome').value,
      email: document.getElementById('edit-email').value,
      telefone: document.getElementById('edit-telefone').value,
      mensagem: document.getElementById('edit-mensagem').value,
      contato: document.getElementById('edit-contato').value,
      opcao: document.getElementById('edit-opcao').value,
      novidadeEmail: document.getElementById('edit-novidade').checked ? 1 : 0 // transforma true/false em 1/0
    };

    // 12. Envia os novos dados para o backend na rota PUT /clientes/editar/:id
    fetch(`/clientes/editar/${id}`, {
      method: 'PUT', // método usado para atualização
      headers: { 'Content-Type': 'application/json' }, // informa que o corpo da requisição é JSON
      body: JSON.stringify(dados) // transforma o objeto em string JSON
    })
    .then(res => res.text()) // recebe resposta do servidor
    .then(msg => {
      // 13. Se deu tudo certo, avisa o usuário
      alert("Cliente atualizado com sucesso!");

      // 14. Redireciona de volta para a página com a lista de clientes
      window.location.href = "/clientes.html";
    })
    .catch(() => {
      // 15. Se algo deu errado na atualização, mostra erro
      alert("Erro ao atualizar cliente!");
    });
  });
});
/* Fim do código de edição de clientes */