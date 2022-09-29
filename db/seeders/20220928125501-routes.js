const fs = require('fs').promises;

module.exports = {
  async up(queryInterface, Sequelize) {
    const file = (await fs.readFile('test/routes.txt', 'utf-8'))
      .split('\n')
      .map((el) => el.split(','))
      .map((el) => ({
        title: el[0],
        length: el[1],
        city: el[2],
        userid: Number(el[3]),
      }));
    await queryInterface.bulkInsert('Routes', file, {});
  },
  // return arr;

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Routes', null, {});
  },
};
