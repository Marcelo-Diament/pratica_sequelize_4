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
