fetch('clientes.json')
    .then(response => response.json())
    .then(data => {
        const tabelaClientes = document.getElementById('tabela-clientes');
        data.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.mensagem}</td>
                <td>${cliente.contato}</td>
                <td>${cliente.opcoes}</td>

                <td>
                    <button>Editar</button>
                    <button>Excluir</button>
                </td>
                <td>
                    <input type="checkbox" ${cliente.novidade ? 'checked' : ''}>
                </td>
            `;
            tabelaClientes.appendChild(row);
        });
    })
    .catch(error => console.error('Erro ao carregar os dados dos clientes:', error));
