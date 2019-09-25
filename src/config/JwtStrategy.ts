import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import config from '../config';
import { User } from '../models/user';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('auth.jwtSecret')
};

const Strategy = new JwtStrategy(options, (jwtPayload, done): void => {
  User.findById(jwtPayload.id)
    .then(user => {
      if (user === null) {
        // TODO: extract
        console.log('User not found in database.');
        done(null, false);
      } else {
        done(null, user);
      }
    })
    .catch(error => done(error));
});

export default Strategy;
