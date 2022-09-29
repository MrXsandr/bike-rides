const fs = require('fs').promises;

module.exports = {
  async up(queryInterface, Sequelize) {
    const file = (await fs.readFile('test/users.txt', 'utf-8'))
      .split('\n')
      .map((el) => el.split(','))
      .map((el) => ({
        name: el[0],
        email: el[1],
        password: el[2],
      }));
    await queryInterface.bulkInsert('Users', file, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
