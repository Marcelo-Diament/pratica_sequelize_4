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

### Model User

```sh
npx sequelize-cli model:generate --name User --attributes nome:string,sobrenome:string,email:string
```
