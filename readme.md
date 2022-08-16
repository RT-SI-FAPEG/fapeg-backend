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


## Como executar este projeto

* Instalar as dependências com `npm i / npm install` ou `yarn / yarn install`

* Scripts da aplicação:
    - `npm run dev` ou `yarn dev` para executar o projeto em ambiente de testes;
    - `npm run build` ou `yarn build` para executar o build da aplicação;
    - `npm run start` ou `yarn start` para executar a aplicação em ambiente de produção;
    - `npm run test` ou `yarn test` para executar os testes da aplicação;
    - `npm run test:cov` ou `yarn test:cov` para executar os testes da aplicação com cobertura de testes (exibição visual dos testes porcentagem do código que foi testado).
