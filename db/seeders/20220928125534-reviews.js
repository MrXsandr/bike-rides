const fs = require('fs').promises;

module.exports = {
  async up(queryInterface, Sequelize) {
    const file = (await fs.readFile('test/reviews.txt', 'utf-8'))
      .split('\n')
      .map((el) => el.split(','))
      .map((el) => ({
        userid: Number(el[0]),
        routeid: Number(el[1]),
        title: el[2],
        text: el[3],
      }));
    await queryInterface.bulkInsert('Reviews', file, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};
