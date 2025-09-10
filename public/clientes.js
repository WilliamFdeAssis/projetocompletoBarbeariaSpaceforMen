document.addEventListener("DOMContentLoaded", () => {
    fetch("/clientes/listar")
        .then(response => response.json())
        .then(clientes => {
            const tabela = document.getElementById("tabela-clientes");
            tabela.innerHTML = "";

            clientes.forEach(cliente => {
                // 🔹 ANTES: usávamos apenas uma string (innerHTML)
                // const row = ` <tr>...</tr> `;

                // 🔹 AGORA: criamos um elemento <tr> real → // NOVO
                const row = document.createElement("tr"); // NOVO
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

                // 🔹 ANTES: não existia nenhum evento no botão
                // 🔹 AGORA: pegamos o botão "Excluir" → // NOVO
                const btnExcluir = row.querySelector(".deletar"); // NOVO

                // 🔹 Adicionamos evento de clique → // NOVO
                btnExcluir.addEventListener("click", () => { // NOVO
                    if (confirm(`Tem certeza que deseja excluir o cliente ${cliente.nomeSobrenome}?`)) {
                        // Fazendo a requisição DELETE para o backend → // NOVO
                        fetch(`/clientes/excluir/${cliente.id}`, { // NOVO
                            method: "DELETE" // NOVO
                        })
                        .then(res => {
                            if (res.ok) {
                                alert("Cliente excluído com sucesso!");
                                row.remove(); // NOVO → remove a linha da tabela sem recarregar
                            } else {
                                alert("Erro ao excluir cliente.");
                            }
                        })
                        .catch(err => console.error("Erro na exclusão:", err)); // NOVO
                    }
                });

                // 🔹 ANTES: usávamos "tabela.innerHTML += row"
                // 🔹 AGORA: usamos appendChild para adicionar o elemento → // ALTERAÇÃO
                tabela.appendChild(row); // ALTERAÇÃO
            });
        })
        .catch(err => console.error("Erro ao carregar clientes:", err));
});
