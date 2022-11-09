import * as dotenv from 'dotenv';
import * as passport from 'passport';
import { Strategy } from 'passport-kakao';
import { userService } from '~/services/user';

dotenv.config();

export function kakaoStrategy() {
  return passport.use(
    new Strategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID as string,
        clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
        callbackURL: '/api/auth/kakao/callback',
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
