import * as passport from 'passport';
import db from '~/db';
import { googleStrategy } from './googleStrategy';
import { kakaoStrategy } from './kakaoStrategy';
import { naverStrategy } from './naverStrategy';

export function passportConfig() {
  passport.serializeUser<number>((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<number>(async (id, done) => {
    try {
      const user = await db.user.findUnique({ where: { id } });
      if (!user) {
        done(null, false);
      } else {
        done(null, user);
      }
    } catch (error) {
      done(error);
    }
  });

  kakaoStrategy();
  googleStrategy();
  naverStrategy();
}
