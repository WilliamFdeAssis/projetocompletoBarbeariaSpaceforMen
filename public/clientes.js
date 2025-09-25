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


 // 🔹 Adiciona evento de editar em todos os clientes
const btnEditar = row.querySelector(".editar");
btnEditar.addEventListener("click", () => {

  // 1. Preenche os campos de edição com os dados do cliente
  document.getElementById("edit-id").value = clientes.id;
  document.getElementById("edit-nome").value = clientes.nomeSobrenome;
  document.getElementById("edit-email").value = clientes.email;
  document.getElementById("edit-telefone").value = clientes.telefone;
  document.getElementById("edit-mensagem").value = clientes.mensagem;
  document.getElementById("edit-contato").value = clientes.contato;
  document.getElementById("edit-opcao").value = clientes.opcao;
  document.getElementById("edit-novidade").checked = clientes.novidadeEmail;

  // 2. Mostra o formulário de edição (que estava oculto no HTML)
  document.getElementById("form-editar").style.display = "block";
});

// 🔹 Captura envio do formulário de edição
document.getElementById("form-editar").addEventListener("submit", (e) => {
  e.preventDefault(); // evita recarregar a página

  // 3. Pega os valores que o usuário alterou
  const id = document.getElementById("edit-id").value;
  const nomeSobrenome = document.getElementById("edit-nome").value;
  const email = document.getElementById("edit-email").value;
  const telefone = document.getElementById("edit-telefone").value;
  const mensagem = document.getElementById("edit-mensagem").value;
  const contato = document.getElementById("edit-contato").value;
  const opcao = document.getElementById("edit-opcao").value;
  const novidadeEmail = document.getElementById("edit-novidade").checked;

  // 4. Envia atualização para o backend
  fetch(`/clientes/editar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nomeSobrenome,
      email,
      telefone,
      mensagem,
      contato,
      opcao,
      novidadeEmail
    })
  })
    .then(res => {
      if (res.ok) {
        alert("Cliente atualizado com sucesso!");
        document.getElementById("form-editar").reset();
        document.getElementById("form-editar").style.display = "none";

        // Opcional: recarregar lista para refletir alterações
        return fetch("/clientes/listar")
          .then(r => r.json())
          .then(clientes => preencherTabela(clientes));
      } else {
        alert("Erro ao atualizar cliente.");
      }
    })
    .catch(err => console.error("Erro na atualização:", err));
});


    tabela.appendChild(row);
  });

 
}
            