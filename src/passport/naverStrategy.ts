import * as dotenv from 'dotenv';
import * as passport from 'passport';
import { Strategy } from 'passport-naver';
import { userService } from '~/services/user';

dotenv.config();

export function naverStrategy() {
  return passport.use(
    new Strategy(
      {
        clientID: process.env.NAVER_CLIENT_ID as string,
        clientSecret: process.env.NAVER_CLIENT_SECRET as string,
        callbackURL: '/api/auth/naver/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userService.findByProfileId(profile.id);
          if (!user) {
            user = await userService.create({
              email: profile.id,
              nickname: profile.displayName,
              provider: profile.provider,
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}
