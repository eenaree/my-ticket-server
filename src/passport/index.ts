import * as passport from 'passport';
import User from '@models/user';
import { googleStrategy } from './GoogleStrategy';
import { kakaoStrategy } from './kakaoStrategy';
import { naverStrategy } from './naverStrategy';

export function passportConfig() {
  passport.serializeUser<number>((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<number>(async (id, done) => {
    try {
      const user = await User.findByPk(id);
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
