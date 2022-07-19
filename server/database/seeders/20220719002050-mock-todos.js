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
      descricao: 'Descrição completa do To Do 01',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      titulo: 'To Do 02',
      resumo: 'Resumo do To Do 02',
      descricao: 'Descrição completa do To Do 02',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      titulo: 'To Do 03',
      resumo: 'Resumo do To Do 03',
      descricao: 'Descrição completa do To Do 03',
      createdAt: new Date(),
      updatedAt: new Date()
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
