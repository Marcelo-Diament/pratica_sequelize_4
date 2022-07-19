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
