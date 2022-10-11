import { QueryInterface } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('series', [
      { series: '와일드카드 결정전', SeasonId: 2 },
      { series: '준플레이오프', SeasonId: 2 },
      { series: '플레이오프', SeasonId: 2 },
      { series: '한국시리즈', SeasonId: 2 },
    ]);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('series', []);
  },
};
