# Carteira Virtual

Aplicação quer permite depositar, sacar e transferir dinheiro para outros usuários

## Utilização

Rode os seguintes comandos:

```
git clone https://github.com/s8p/virtual_wallet
cd virtual_wallet
cp .env.example .env
```

Edite o arquivo `.env` com os valores necessários

- `PORT` Define qual porta a API irá utilizar, utilize a porta `3000`
- `DB_URI` Define a URI da database, por padrão sera utilizado o endereço do Docker
- `POSTGRES_PASSWORD` Variável de ambiente necessária para o serviço do postgres no Docker
- `SECRET_KEY` Chave utilizada para encriptar as credênciais dos usuários
- `EXPIRES_IN` Define em quanto tempo o JWT vai expirar, ex. 24h

Com isso feito execute:

```
docker-compose up --build
```

Certifique-se que os serviços estão rodando

### Front End

Url: http://localhost:80

### Back End

Url base: `http://localhost:3000/api`

#### Endpoints

##### POST /register

Registra um novo usuário.

Campos obrigatórios:

- username
- password

Ao se registrar, o novo usuário recebe R$100 + o valor (se existir) do `balance` de saldo.

- Esquema de requisição:

```
{
    "username": string,
    "password": string,
    "name": string
    "balance": float
}
```

- Esquema de resposta:

```
{
    user: {
        "username": string,
        "password": string,
        "name": string | null
        "balance": float
        },
    token: JWT Token
}
```

Possíveis erros:

- 400 Se algum campo obrigatório estiver faltando ou algum valor for inválido
- 409 Se o nome de usuário já estiver cadastrado

##### POST /login

Gera JWT Token para acesso de outras rotas

Campos obrigatórios:

- username
- password

---

- Esquema de requisição:

```
{
    "username": string,
    "password": string,
}
```

- Esquema de resposta:

```
{
    token: JWT Token
}
```

Possíveis erros:

- 400 Se algum campo obrigatório estiver faltando ou algum valor for inválido
- 401 Se o nome de usuário ou senha estiver incorreto

##### GET /user

Pega informações básicas do usuário autenticado

Campos obrigatórios:

- Bearer Token

---

- Esquema de requisição:

```
{}
```

- Esquema de resposta:

```
{
    token: JWT Token
}
```

Possíveis erros:

- 400 Se algum campo obrigatório estiver faltando ou algum valor for inválido
- 401 Se o nome de usuário ou senha estiver incorreto

##### GET /history

Pega histórico de transações do usuário autenticado

Campos obrigatórios:

- Bearer Token

---

- Esquema de requisição:

```
{}
```

- Esquema de resposta:

```
[
    {
        "userRecipient": {
            "name": string,
            "username": string
            },
        "userOrigin": {
            "name": string,
            "username": string
    },
        "transferedValue": float,
        "date": Date,
        "id": number
    }
]
```

Possíveis erros:

- 400 Se algum campo obrigatório estiver faltando ou algum valor for inválido
- 401 Se o token estiver inválido

##### POST /withdraw

Faz o saque do valor definido

Campos obrigatórios:

- Bearer Token
- value

---

- Esquema de requisição:

```
{
    "value": float
}
```

- Esquema de resposta:

```
[
    {
        "userRecipient": null,
        "userOrigin": {
            "name": string,
            "username": string
    },
        "transferedValue": float,
        "date": Date,
        "id": number
    }
]
```

Possíveis erros:

- 400 Se algum campo obrigatório estiver faltando ou algum valor for inválido
- 401 Se o token estiver inválido
- 422 Se o saldo for insuficiente

##### POST /deposit

Faz o depósito do valor definido

Campos obrigatórios:

- Bearer Token
- value

---

- Esquema de requisição:

```
{
    "value": float
}
```

- Esquema de resposta:

```
[
    {
        "userRecipient": null,
        "userOrigin": {
            "name": string,
            "username": string
    },
        "transferedValue": float,
        "date": Date,
        "id": number
    }
]
```

Possíveis erros:

- 400 Se algum campo obrigatório estiver faltando ou algum valor for inválido
- 401 Se o token estiver inválido
