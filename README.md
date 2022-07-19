# Prática Sequelize #04

Prática de Sequelize (migrations, seeders, associations, etc.), Express, NodeJS.

## Iniciando o projeto

```sh
express server --view=ejs
```

```sh
cd server && npm install --save sequelize mysql2 && npm install --save -D nodemon sequelize-cli
```

**package.json**

```json
{
  // ...
  "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www"
  }
  // ...
}
```

Instalar todas as dependências com `npm install` (dentro da pasta server).

Rodar o servidor com `npm run dev` .

No Workbench, após ativar o MySQL via xampp, executar a seguinte query para criar nosso BD:

```sql
CREATE DATABASE pratica_sequelize_4;
```

## Conexão com o BD

Criar o arquivo .sequelizerc com o seguinte conteúdo:

```js
const path = require('path')

module.exports = {
    config: path.resolve('./database/config', 'config.json'),
    'models-path': path.resolve('./database/models'),
    'seeders-path': path.resolve('./database/seeders'),
    'migrations-path': path.resolve('./database/migrations'),
}
```

```sh
npx sequelize init
```

No arquivo server/database/config/config.json, deixaremos o conteúdo da seguinte maneira:

```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "pratica_sequelize_4",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "pratica_sequelize_4_teste",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "pratica_sequelize_4_real_oficial",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

## Models

Vamos criar os models a partir do sequelize-cli.

```sh
# MODEL USER
npx sequelize-cli model:generate --name User --attributes nome:string,sobrenome:string,email:string

# MODEL STATUS
npx sequelize-cli model:generate --name Status --attributes titulo:string

# MODEL TODO
npx sequelize-cli model:generate --name Todo --attributes titulo:string,resumo:string,descricao:string
```

Veja que não só os models só foram criados, como também os arquivos de migration, e o próprio sequelize criou os campos id, createdAt e updatedAt nas migrations.

| IMPORTANTE: repare que temos nos arquivos de migrations os métodos `up` e `down` - o método `up` é executado quando rodamos uma migration enquanto o método `down` é executado quando desfazemos (UNDO) uma migration. Por isso é importante que todo método `down` realmente desfaça o que está sendo feito pelo método `up` (no caso, o método `up` cria uma tabela e o método `down` a apaga).

Para rodarmos a migration, vamos executar no terminal o seguinte comando (dentro da pasta server):

```sh
npx sequelize-cli db:migrate
```

Para validarmos se a migration funcionou corretamente, vamos rodar algumas queries no nosso Workbench:

```sql
-- CREATE DATABASE pratica_sequelize_4;
USE pratica_sequelize_4;

DESCRIBE sequelizemeta;
SELECT * FROM sequelizemeta;

DESCRIBE users;
SELECT * FROM users;

DESCRIBE todos;
SELECT * FROM todos;

DESCRIBE statuses;
SELECT * FROM statuses;
```

## Seeders

```sh
# SEEDER USER
npx sequelize-cli seed:generate --name mock-users

# SEEDER STATUS
npx sequelize-cli seed:generate --name mock-statuses

# SEEDER TODO
npx sequelize-cli seed:generate --name mock-todos
```

Nos seeders criados, vamos alimentá-los da seguinte maneira:

**Users**

```js
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('Users', [{
                nome: 'Fulano',
                sobrenome: 'Santos',
                email: 'fulano@gmail.com'
            },
            {
                nome: 'Ciclano',
                sobrenome: 'Reis',
                email: 'ciclano@gmail.com'
            },
            {
                nome: 'Josué',
                sobrenome: 'Silva',
                email: 'josue@gmail.com'
            }
        ], {})
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {});
    }
};
```

**Statuses**

```js
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('Statuses', [{
                title: '01- A Desenvolver'
            },
            {
                title: '02 - Em Desenvolvimento'
            },
            {
                title: '03 - A Validar'
            },
            {
                title: '04 - Em Validação'
            },
            {
                title: '05 - Validado'
            },
            {
                title: '06 - A Ajustar'
            },
            {
                title: '07 - Finalizado'
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Statuses', null, {});
    }
};
```

**To Dos**

```js
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('Todos', [{
                title: 'To Do 01',
                excerpt: 'Resumo do To Do 01',
                description: 'Descrição completa do To Do 01'
            },
            {
                title: 'To Do 02',
                excerpt: 'Resumo do To Do 02',
                description: 'Descrição completa do To Do 02'
            },
            {
                title: 'To Do 03',
                excerpt: 'Resumo do To Do 03',
                description: 'Descrição completa do To Do 03'
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Todos', null, {});
    }
};
```
