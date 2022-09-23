import { QueryInterface } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('teams', [
      { team: 'KT', name: 'KT' },
      { team: 'OB', name: '두산' },
      { team: 'SS', name: '삼성' },
      { team: 'LG', name: 'LG' },
      { team: 'WO', name: '키움' },
      { team: 'SK', name: 'SSG' },
      { team: 'LT', name: '롯데' },
      { team: 'NC', name: 'NC' },
      { team: 'HT', name: '기아' },
      { team: 'HH', name: '한화' },
    ]);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('teams', []);
  },
};
