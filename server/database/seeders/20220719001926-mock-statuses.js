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
