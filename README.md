# Automação Cypress — ServeRest

Projeto de testes automatizados para o desafio **ServeRest**, cobrindo **3 cenários E2E** no frontend ([front.serverest.dev](https://front.serverest.dev/)) e **3 cenários de API** conforme o [Swagger](https://serverest.dev/).

## Cenários de teste (6 no total)

O projeto contém **seis** testes automatizados, distribuídos em **quatro** arquivos spec. Abaixo, o que cada um valida e como se encaixam.

### Frontend — 3 cenários E2E

| # | Arquivo | Cenário | O que valida |
|---|---------|---------|--------------|
| 1 | `frontend/cadastro/cadastro.cy.js` | Cadastro pela interface | Fluxo completo em `/cadastrarusuarios`: preenchimento do formulário, mensagem de sucesso da aplicação e redirecionamento para a área administrativa (`/admin/home`), com saudação contendo o nome do usuário. |
| 2 | `frontend/login/login.cy.js` | Login com sucesso | Usuário **criado antes via API** (`POST /usuarios`), depois login na tela com e-mail e senha gerados — valida URL pós-login e mensagem de boas-vindas. |
| 3 | `frontend/login/login.cy.js` | Login com senha incorreta | Reutiliza o **mesmo usuário** do cenário anterior (hook `before`): tenta login com senha errada e verifica mensagem de erro na interface, permanecendo em `/login`. |

### API — 3 cenários

| # | Arquivo | Cenário | O que valida |
|---|---------|---------|--------------|
| 4 | `api/usuarios/tests/usuarios.cy.js` | Cadastro com sucesso | `POST /usuarios` retorna **201**, corpo com mensagem e `_id` conforme contrato do Swagger. |
| 5 | `api/usuarios/tests/usuarios.cy.js` | E-mail duplicado | Dois `POST /usuarios` com o **mesmo payload**: o segundo retorna **400** e a mensagem de e-mail já utilizado. |
| 6 | `api/login/tests/login.cy.js` | Login após cadastro | Encadeia **cadastro** (`POST /usuarios`) e **login** (`POST /login`) com os mesmos dados: **200**, mensagem de sucesso e token `authorization` no formato esperado. |

### Como os cenários se relacionam

- **API de usuários (4 e 5)** exercitam o recurso **cadastro** de forma isolada: sucesso e regra de negócio de unicidade de e-mail, sem depender do frontend.
- **API de login (6)** trata **autenticação** como um fluxo em duas etapas na mesma spec: primeiro garante que o usuário existe na API, depois valida o retorno do login — espelha o contrato que o front consome.
- **E2E de cadastro (1)** valida o mesmo domínio “usuário” **pela UI**, incluindo integração visual com a API em segundo plano.
- **E2E de login (2 e 3)** concentram-se na **tela de login**: o pré-cadastro via API isola o teste da interface (não mistura outro fluxo de tela) e permite o cenário negativo (3) usando um usuário **garantidamente existente**, o que torna a asserção de erro estável.

Em resumo: **API** confirma contrato e regras do Swagger; **frontend** confirma experiência do usuário e mensagens na interface; **Faker** (abaixo) liga os dois mundos com dados únicos a cada execução.

## Uso do Faker (`@faker-js/faker`)

A biblioteca **Faker** gera dados fictícios (nome, e-mail, senha) de forma **aleatória a cada execução**. No projeto ela é centralizada em `cypress/support/factories/usuario.js`, na função `buildUsuarioAdministrador()`, usada por todos os specs.

**Por que usar:**

- **E-mails únicos** — evitam conflito com “e-mail já cadastrado” em ambiente compartilhado (API pública) e permitem o cenário de duplicidade **dentro do mesmo teste** (dois POSTs com o mesmo objeto).
- **Independência entre execuções** — não dependemos de uma planilha fixa nem de limpeza manual de massa de dados.
- **Paridade com dados reais** — nomes e formatos de e-mail/senha se aproximam de entradas válidas, sem expor dados sensíveis.

Cada cenário chama a factory quando precisa de um payload; assim, a geração de massa fica **única**, **legível** e fácil de estender (por exemplo, `buildUsuarioAdministrador({ administrador: 'false' })` no futuro).

## Pré-requisitos

- [Node.js](https://nodejs.org/) LTS (recomendado v18 ou v20)

## Instalação

```bash
npm install
```

## Executar os testes

Headless (CI / terminal):

```bash
npm test
```

Interface interativa:

```bash
npm run cypress:open
```

## Relatório

Com `npm test`, é gerado relatório **JUnit** em `cypress/results/` (arquivos `junit-*.xml`), útil para pipelines e ferramentas de CI.

## Estrutura principal

- `cypress/e2e/frontend/` — testes de interface (cadastro, login)
- `cypress/e2e/api/` — testes de API (`usuarios`, `login`) com camada `requests/`
- `cypress/support/factories/` — geração de dados com Faker

## Configuração

URLs e `apiUrl` estão em `cypress.config.js` (`baseUrl` do front e `env.apiUrl` da API).
