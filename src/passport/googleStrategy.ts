import * as dotenv from 'dotenv';
import * as passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { userService } from '~/services/user';

dotenv.config();

export function googleStrategy() {
  return passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: '/api/auth/google/callback',
        scope: ['profile'],
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
          if (error instanceof Error) {
            return done(error);
          }
        }
      }
    )
  );
}
