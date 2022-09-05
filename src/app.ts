import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as session from 'express-session';
import * as morgan from 'morgan';
import * as passport from 'passport';
import { sequelize } from '@models';
import routes from '@routes';
import { passportConfig } from './passport';

dotenv.config();
passportConfig();

const app = express();

const prod = process.env.NODE_ENV === 'production';

app.set('port', process.env.PORT || 8080);

(async function () {
  try {
    await sequelize.sync();
    console.log('db 연결 성공!');
  } catch (error) {
    console.error('db 연결 실패...');
  }
})();

app.use(
  cors({
    origin: 'http://localhost:4000',
    credentials: true,
  })
);
app.use(morgan(prod ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    cookie: {
      secure: prod || false,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    if (res.headersSent) {
      return next(err);
    }
    console.error(err.stack);
    res.status(500).send({ message: '서버 오류가 발생했습니다.' });
  }
};

app.use(errorHandler);

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} 번 포트에서 서버 대기 중...`);
});
