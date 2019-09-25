import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../models/user';
import { LoginDTO, RegisterDTO, RegisteredUser } from '../types/user';

export default new (class UserService {
  async login(details: LoginDTO): Promise<string | null> {
    const user = await User.findOne({ email: details.email }).exec();
    if (!user) {
      return null;
    }
    const matches = await bcryptjs.compare(details.password, user.password);
    if (!matches) {
      return null;
    }
    const token = jwt.sign({ id: user._id }, config.get('auth.jwtSecret'));
    return token;
  }

  // Returns null if user exists
  async register(details: RegisterDTO): Promise<RegisteredUser | null> {
    const user = await User.findOne({ email: details.email }).exec();

    if (!!user) {
      return null;
    }

    const hashedPassword = await bcryptjs.hash(details.password, config.get('auth.saltRounds'));

    const newUser = await User.create({
      email: details.email,
      firstName: details.firstName,
      lastName: details.lastName,
      password: hashedPassword
    });

    return {
      _id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName
    };
  }
})();
