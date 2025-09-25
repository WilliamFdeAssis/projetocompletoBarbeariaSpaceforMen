/* Carregar todos os clientes ao carregar a página */

document.addEventListener("DOMContentLoaded", () => {
  fetch("/clientes/listar")
    .then(response => response.json())
    .then(clientes => preencherTabela(clientes)) // ✅ mostra todos
    .catch(err => console.error("Erro ao carregar clientes:", err));
});

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


    tabela.appendChild(row);
  });
}
            