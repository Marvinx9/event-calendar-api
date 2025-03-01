# Event Calendar-api

## 📌 Sobre o Projeto

O **Event Calendar** é um gerenciador de eventos desenvolvido em **React** com **Recoil** para gerenciamento de estado. A aplicação permite que os usuários **criem, editem, excluam e listem** eventos agendados, além de **filtrar** os eventos por **status** ou **data**.

Esse projeto **back-end** pode ser executado em um ambiente **Docker** juntamente com o **front-end**.

## 🚀 Tecnologias Utilizadas

- **Nest** - Framework do Node para criação de pojetos
- **Postgres** - Para armazenamento e persistência dos dados
- **Swagger** - Para documentação detalhada das rotas
- **Docker** - Containerização da aplicação

## 🎯 Funcionalidades

✅ Criar novos eventos
✅ Editar eventos existentes
✅ Excluir eventos
✅ Listar todos os eventos
✅ Integração com API do front-end

## 🛠️ Como Executar o Projeto

### 🔹 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- **Docker**
- **Node.js** (caso queira rodar fora do Docker)
- **Gerenciador de pacotes** (npm ou yarn)

### 🔹 Clonar o repositório(s)

```sh
  git clone https://github.com/seu-usuario/event-calendar.git
```

```sh
  git clone https://github.com/Marvinx9/event-calendar-api
  cd event-calendar
```

### 🔹 Rodando com Docker

```sh
  docker-compose up --build
```

### 🔹 Rodando sem Docker

```sh
  npm install  # ou yarn install
  npm start:dev    # ou yarn start:dev
```

A aplicação estará disponível em: **http://localhost:8080/api**

## 🔗 End points

- `GET /agendamentos` → Lista todos os eventos
- `POST /agendamentos` → Cria um novo evento
- `PUT /agendamentos/:id` → Atualiza um evento existente
- `DELETE /agendamentos/:id` → Remove um evento

## 📄 Licença

Este projeto está sob a licença **MIT**. Sinta-se à vontade para usá-lo e modificá-lo! 😊
