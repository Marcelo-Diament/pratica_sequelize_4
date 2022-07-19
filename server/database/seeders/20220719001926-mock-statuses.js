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
