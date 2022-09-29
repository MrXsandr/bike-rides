const fs = require('fs').promises;

module.exports = {
  async up(queryInterface, Sequelize) {
    const file = (await fs.readFile('test/likes.txt', 'utf-8'))
      .split('\n')
      .map((el) => el.split(','))
      .map((el) => ({
        userid: Number(el[0]),
        routeid: Number(el[1]),
      }));
    // return arr;
    await queryInterface.bulkInsert('Likes', file, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Likes', null, {});
  },
};
