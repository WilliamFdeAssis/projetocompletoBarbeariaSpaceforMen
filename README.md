
# ✂️ Barbearia Space for Men

Projeto desenvolvido em **Node.js** para gerenciamento e apresentação de serviços de uma barbearia moderna, incluindo páginas como **Home, Serviços, Contato e Agendamento**.
O objetivo é criar um site funcional, com backend em Node.js e persistência de dados no **MySQL**.

---

## 🚀 Tecnologias utilizadas

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Body-Parser](https://www.npmjs.com/package/body-parser)
* [MySQL2](https://www.npmjs.com/package/mysql2)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Nodemon](https://www.npmjs.com/package/nodemon)

---

## 📂 Estrutura do projeto

```
barbearia-space/
│
├── public/          # Arquivos estáticos (HTML, CSS, imagens, JS)
├── database/        # Conexão com banco de dados
├── routes/          # Arquivos de rotas
├── app.js           # Arquivo principal da aplicação
├── package.json
└── .gitignore
```

---

## ⚙️ Configuração do ambiente

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/barbearia-space.git
cd barbearia-space
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo **.env** na raiz do projeto e adicione suas configurações:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=barbearia
```

---

## 🛠 Executando o projeto

### Ambiente de desenvolvimento:

```bash
npm run dev
```

### Ambiente de produção:

```bash
npm start
```

---

## 🔒 Boas práticas de versionamento

Este projeto utiliza um **.gitignore** para manter o repositório limpo e seguro.
Os seguintes arquivos/pastas não são versionados:

* `.env` → Contém informações sensíveis (senhas, usuários, chaves de API)
* `node_modules/` → Dependências que podem ser reinstaladas via `npm install`
* Arquivos temporários, de log e cache

📄 Trecho do **.gitignore**:

```
.env
node_modules/
```

---

## 📜 Licença

Este projeto é de **uso livre para fins de estudo**.
Sinta-se à vontade para clonar, modificar e melhorar.
