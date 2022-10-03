import { QueryInterface } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('teams', [
      { team: 'KT' },
      { team: 'OB' },
      { team: 'SS' },
      { team: 'LG' },
      { team: 'WO' },
      { team: 'SK' },
      { team: 'LT' },
      { team: 'NC' },
      { team: 'HT' },
      { team: 'HH' },
    ]);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('teams', []);
  },
};
