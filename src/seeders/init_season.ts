import { QueryInterface } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('seasons', [
      { season: '정규시즌' },
      { season: '포스트시즌' },
      { season: '와일드카드 결정전' },
      { season: '준플레이오프' },
      { season: '플레이오프' },
      { season: '한국시리즈' },
    ]);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('seasons', []);
  },
};
