import { QueryInterface } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('seasons', [
      { stadium: '수원 KT 위즈 파크', TeamId: 1 },
      { stadium: '서울 잠실야구장(두산)', TeamId: 2 },
      { stadium: '대구 삼성 라이온즈 파크', TeamId: 3 },
      { stadium: '서울 잠실야구장(LG)', TeamId: 4 },
      { stadium: '고척 스카이돔', TeamId: 5 },
      { stadium: '인천 SSG 랜더스필드', TeamId: 6 },
      { stadium: '부산 사직야구장', TeamId: 7 },
      { stadium: '창원 NC 파크', TeamId: 8 },
      { stadium: '광주 기아 챔피언스 필드', TeamId: 9 },
      { stadium: '대전 한화생명 이글스 파크', TeamId: 10 },
    ]);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('seasons', []);
  },
};
