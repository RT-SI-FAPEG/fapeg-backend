# Observatório FAPEG - Backend

## Sobre o projeto

O presente projeto foi desenvolvido com NodeJS e Typescript, utilizando [Arquitetura Limpa](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) como norteador da arquitetura e organização das camadas da aplicação.

## Sobre a arquitetura do projeto

Como dito anteriormente, o projeto se baseia nos conceitos da Arquitetura Limpa, de Robert Martin. 
De forma resumida, as "camadas" seguem as pastas que se encontram dentro da pasta `src` do projeto.
Para cada uma das camadas, segue a explicação resumida:
- `entites`: Entidades que contém as regras de negócio do domínio da aplicação. Estas regras são intrínsecas ao fluxo e funcionamento da organização. Elas existiriam mesmo se não houvesse um sistema de software que as automatizasse;

- `usecases`: Os casos de uso são as regras de negócio da aplicação em si. Representam o fluxo de execução do sistema de software para realizar determinada atividade;

- `adapters`: Contém funcionalidades que adaptam os dados oriundos de fontes externas (arquivos de texto, bases de dados, web, etc) para um formato que a aplicação (usecases e entities possam entender);

- `infra`: Contém as classes concretas das dependências da aplicação (Bancos de dados, sistemas de validação, envio de e-mail, etc);

- `main`: Camada responsável por criar todas as instâncias da aplicação e servir de ponto de entrada para a execução da aplicação.

- `shared`: Camada adicional criada com a finalidade de conter códigos utilitários e arquivos de configuração, constantes e erros da aplicação. Podem ser reutilizados pelas demais camadas do sistema.

Como informação adicional, vale salientar que a arquitetura limpa segue um princípio fundamental que é a **regra de dependência**, assim, uma camada só conhece sua camada imediatamente posterior na hierarquia, não podendo haver nenhuma conexão direta entre elas, a não ser que seja utilizado algum mecanismo que quebre a dependência direta. Comumente, para a quebra dessa dependência, utiliza-se do mecanismo de inversão de dependência (Dependency Inversion - A letra "D" dos princípios SOLID). Onde uma camada interna depende apenas de uma interface que será implementada por uma camada anterior na hierarquia.

## Hierarquia das camadas

Segue um exemplo da hierarquia das camadas, da esquerda para a direita, temos as mais externas para mais internas

```infra -> adapters -> usecases -> main```

## Variáveis de ambiente necessárias

* `MAIL_ADDRESS`: Endereço de e-mail a ser utilizado na aplicação (envio de e-mails) 
* `MAIL_PASSWORD`: Senha do endereço de e-mail
* `BASE_URL_FRONTEND`: Url do projeto frontend da aplicação

## Como executar este projeto

* Instalar as dependências com `npm i / npm install` ou `yarn / yarn install`

* Scripts da aplicação:
    - `npm run dev` ou `yarn dev` para executar o projeto em ambiente de testes;
    - `npm run build` ou `yarn build` para executar o build da aplicação;
    - `npm run start` ou `yarn start` para executar a aplicação em ambiente de produção;
    - `npm run test` ou `yarn test` para executar os testes da aplicação;
    - `npm run test:cov` ou `yarn test:cov` para executar os testes da aplicação com cobertura de testes (exibição visual dos testes porcentagem do código que foi testado).

* Para execução somente em ambiente de desenvolvimento (localmente):
    - Instalar as dependências
    - Executar o script de dev (`npm run dev` ou `yarn dev`)

* Para execução em ambiente de produção:
    - Instalar as dependências
    - Executar o script de build (`npm run build` ou `yarn build`)
    - Executar o script de start (`npm run start` ou `yarn start`)

* Observação:
    Periodicamente executar o comando `npm run typeorm migration:run -d ./src/database` ou `yarn typeorm migration:run -d ./src/database` para executar as alterações no esquema de bancos de dados da aplicação.

## Próximos passos

* Implementar chat entre pesquisadores para troca de informações
    Para essa atividade, sugerimos a utilização de ou Socket.io ou alguma ferramenta já pronta, como Firebase.

* Indicadores de forma dinâmica
    Para esta atividade, será necessário o acesso ao banco de dados da FAPEG, onde os dados deverão ser tratados e exibidos sob demanda.

* Gráficos
    Exibir gráficos de indicadores de forma dinâmica, segue basicamente a mesma ideia da sugestão anterior.

* Pesquisas de forma dinâmica
    Assim como as duas sugestões anteriores, esta diz respeito às pesquisas e cases de sucesso dinâmicos na aplicação. Atualmente utilizamos arquivos .json estáticos para exibição dessas pesquisas. Será necessário implementar acessos aos bancos de dados da FAPEG para que possamos exibir de forma dinâmica as pesquisas e casos de sucesso.

* Monitoração da aplicação
    Utilizar de alguma ferramenta para monitorar o acesso à aplicação.
    Recomendamos a utilização de Grafana ou ferramenta similar para acompanhamento da aplicação.
    Além disso, recomendamos que a aplicação seja executada com a utilização de algum service manager, como o `pm2`.

* Criação de banco de dados da aplicação
    Por ainda estarmos em fase de testes e homologação, o banco de dados utilizado está sendo o Sqlite (Arquivo de banco de dados simples).
    Posteriormente para ambiente produtivo será necessário a utilização de um banco de dados mais robusto. Para isso, recomendamos a utilização de MySql ou Postgres.

* Criação de ambiente produtivo para a aplicação
    O ambiente já foi criado por parte da FAPEG, agora basta que a aplicação seja instalada e monitorada.




