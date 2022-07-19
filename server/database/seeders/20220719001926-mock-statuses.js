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
      titulo: '01- A Desenvolver',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      titulo: '02 - Em Desenvolvimento',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      titulo: '03 - A Validar',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      titulo: '04 - Em Validação',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      titulo: '05 - Validado',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      titulo: '06 - A Ajustar',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      titulo: '07 - Finalizado',
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
    await queryInterface.bulkDelete('Statuses', null, {});
  }
};
