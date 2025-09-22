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
    const btnExcluir = row.querySelector(".deletar");
    btnExcluir.addEventListener("click", () => {
      if (confirm(`Tem certeza que deseja excluir o cliente ${cliente.nomeSobrenome}?`)) {
        fetch(`/clientes/excluir/${cliente.id}`, { method: "DELETE" })
          .then(res => {
            if (res.ok) {
              alert("Cliente excluído com sucesso!");
              row.remove();
            } else {
              alert("Erro ao excluir cliente.");
            }
          })
          .catch(err => console.error("Erro na exclusão:", err));
      }
    });

    tabela.appendChild(row);
  });
}
