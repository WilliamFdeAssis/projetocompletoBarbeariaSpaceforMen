document.addEventListener("DOMContentLoaded", () => {
    fetch("/clientes/listar")
        .then(response => response.json())
        .then(clientes => {
            const tabela = document.getElementById("tabela-clientes");
            tabela.innerHTML = "";

            clientes.forEach(cliente => {
                const row = `
                    <tr>
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
                    </tr>
                `;
                tabela.innerHTML += row;
            });
        })
        .catch(err => console.error("Erro ao carregar clientes:", err));
});
