import { QueryInterface } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('seasons', [
      { season: '정규시즌' },
      { season: '포스트시즌' },
    ]);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('seasons', []);
  },
};
