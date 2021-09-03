# Autenticação com Next.js e Nest.js

Essa é uma aplicação fullstack escrita em TypeScript, utilizando os frameworks Nest.js (back-end) e
Next.js (front-end). Ela contém todo o fluxo de autenticação e autorização com cadastro de usuário
com diferentes papéis de acesso (roles), proteção de rotas do back-end com JWT de curta duração com
renovação automática por refresh token e, por fim, proteção rotas no front-end tanto via server
side rendering (SSR) quanto via hooks. Esses são os elementos fundamentais para basicamente
qualquer aplicação web moderna.

O foco desse projeto está na estratégia de autenticação do front-end com uso do Axios para
requisições e revalidação automática do JWT, além de um estado global usando a Context API do
React, mas tem um back-end funcional que pode ser um bom ponto de partida para desenvolvedores
front-end com pouco experiência em desenvolvimento de APIs e/ou desenvolvedores estudando
autenticação e autorização no Nest.js.

Sem mais delongas, vamos ao passo a passo de como rodar localmente:

Antes de mais nada, você precisa clonar esse repositório, obviamente, e vai precisar de um banco
Postgres. São os únicos requisitos.

Dentro do diretório back-end você só precisa renomear o arquivo `.env.example` para `.env`. Nesse
arquivo vai a string de conexão com seu Postgres.

Dentro do diretório front-end você só precisa renomear o arquivo `.env.example` para `.env`,
nenhuma outra alteração precisa ser feita.

Na raiz do projeto:

```bash
# instalar as dependências
yarn

# criar as tabelas no banco
yarn prisma:push

# iniciar ambos os projetos em modo dev
yarn dev
```

Pronto, você estará pronto para acessar a aplicação em `http://localhost:3000`.

## Tecnologias utilizadas

### back-end

- Nest.js (com Express)
- Prisma
- Passport

### front-end

- Next.js
- Axios
- Chakra-ui
- React Hook Form
- Yup
