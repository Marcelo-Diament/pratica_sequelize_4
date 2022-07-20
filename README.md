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
                titulo: '01- A Desenvolver'
            },
            {
                titulo: '02 - Em Desenvolvimento'
            },
            {
                titulo: '03 - A Validar'
            },
            {
                titulo: '04 - Em Validação'
            },
            {
                titulo: '05 - Validado'
            },
            {
                titulo: '06 - A Ajustar'
            },
            {
                titulo: '07 - Finalizado'
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
                titulo: 'To Do 01',
                resumo: 'Resumo do To Do 01',
                descricao: 'Descrição completa do To Do 01'
            },
            {
                titulo: 'To Do 02',
                resumo: 'Resumo do To Do 02',
                descricao: 'Descrição completa do To Do 02'
            },
            {
                titulo: 'To Do 03',
                resumo: 'Resumo do To Do 03',
                descricao: 'Descrição completa do To Do 03'
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

Populando nosso BD com o conteúdo de exemplo (mocks)

```sh
npx sequelize-cli db:seed:all
```

**Testando no Workbench**

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

| Perceba que os campos createdAt e updatedAt estão vazio E não temos FKs. Vamos corrigir isso...

### Undo

Vamos desfazer os seeds e migrations antes de ajustar.

```sh
# Desfazendo os seeds
npx sequelize-cli db:seed:undo:all

# Desfazendo as migrations
npx sequelize-cli db:migrate:undo:all
```

### Ajustes Simples

Vamos adicionar os valores de createdAt e updatedAt para cada registro a ser inserido via seeders:

```js
{
    // ...,
    createdAt: new Date(),
    updatedAt: new Date()
}
```

## Associations

Criando as FKs no seeder:

```js
// Exemplo
{
    titulo: 'To Do 02',
    resumo: 'Resumo do To Do 02',
    descricao: 'Descrição completa do To Do 02',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 3,
    statusId: 4
}
```

E no model (Todo):

```js
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Todo extends Model {
        static associate(models) {}
    }
    Todo.init({
        titulo: DataTypes.STRING,
        resumo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        statusId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Todo',
    });
    return Todo;
};
```

E na migration:

```js
'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Todos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            titulo: {
                type: Sequelize.STRING
            },
            resumo: {
                type: Sequelize.STRING
            },
            descricao: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            statusId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'statuses',
                    key: 'id'
                }
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Todos');
    }
};
```

Na [documentação](https://sequelize.org/docs/v6/other-topics/migrations/#migration-skeleton) mostram de outra forma, mas, se buscar no StackOverflow, verá que a forma que funciona de verdade é da maneira que fizemos ([link](https://stackoverflow.com/questions/60338378/sequelize-migration-fails-with-errno-150-foreign-key-constraint-is-incorrectly)).

Criando as associações de fato:

**Model User**

```js
User.hasMany(models.Todo, {
    as: 'todos'
})
```

**Model Status**

```js
Status.hasMany(models.Todo, {
    as: 'todos'
})
```

**Model Todo**

```js
Todo.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
})
Todo.belongsTo(models.Status, {
    foreignKey: 'statusId',
    as: 'status'
})
```

Executar as migrations e seeders novamente:

```sh
# Refazendo as migrations
npx sequelize-cli db:migrate

# Refazendo os seeds
npx sequelize-cli db:seed:all
```

## Routes

**server/app.js**

Adicionamos:

```js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var statusesRouter = require('./routes/statuses');
var todosRouter = require('./routes/todos');

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/status', statusesRouter);
app.use('/todos', todosRouter);
```

**server/routes/users.js**

```js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users')

router.get('/:id/todos', usersController.showTodos);
router.get('/:id', usersController.show);
router.get('/', usersController.index);

module.exports = router;
```

**server/routes/statuses.js**

```js
const express = require('express');
const router = express.Router();
const statusesController = require('../controllers/statuses')

router.get('/', statusesController.index);

module.exports = router;
```

**server/routes/todos.js**

```js
const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos')

router.get('/new', todosController.add);
router.post('/new', todosController.create);

router.delete('/:id/delete', todosController.destroy);

router.get('/:id/edit', todosController.edit);
router.put('/:id/edit', todosController.update);

router.get('/:id', todosController.show);

router.get('/', todosController.index);

module.exports = router;
```

## Services

Criar pasta `services` dentro de `server` . Dentro dela teremos:

**server/services/statuses.js**

```js
const {
    Status
} = require('../database/models')

const statusesServices = {}

statusesServices.getAllStatuses = async () => {
    const statuses = await Status.findAll({
        include: [{
            association: 'todos'
        }]
    })
    return statuses
}

module.exports = statusesServices
```

**server/services/users.js**

```js
const {
    User
} = require('../database/models')

const usersServices = {}

usersServices.getAllUsers = async () => {
    const users = await User.findAll({
        include: [{
            association: 'todos'
        }]
    })
    return users
}

usersServices.getUser = async (id) => {
    const user = await User.findOne({
        where: {
            id
        },
        include: [{
            association: 'todos'
        }]
    })
    return user
}

usersServices.getUserTodos = async (id) => {
    const user = await User.findOne({
        where: {
            id
        },
        include: [{
            association: 'todos'
        }]
    })
    const {
        todos
    } = user
    return todos || null
}

module.exports = usersServices
```

**server/services/todos.js**

```js
const {
    Todo
} = require('../database/models')

const todosServices = {}

todosServices.getAllTodos = async () => {
    const todos = await Todo.findAll({
        include: [{
                association: 'user'
            },
            {
                association: 'status'
            }
        ]
    })
    return todos
}

todosServices.getAllTodosByUserId = async userId => {
    const todos = await Todo.findAll({
        where: {
            userId
        },
        include: [{
                association: 'user'
            },
            {
                association: 'status'
            }
        ]
    })
    return todos
}

todosServices.getTodoById = async (id) => {
    const todo = await Todo.findByPk(id, {
        include: [{
                association: 'user'
            },
            {
                association: 'status'
            }
        ]
    })
    return todo
}

todosServices.updateTodo = async (id, todo) => {
    const updated = await Todo.update({
        ...todo
    }, {
        where: {
            id
        }
    })
    return updated
}

todosServices.createTodo = async todo => {
    const created = await Todo.create(todo)
    return created
}

todosServices.destroyTodo = async id => {
    return await Todo.destroy({
        where: {
            id
        }
    })
}

module.exports = todosServices
```
