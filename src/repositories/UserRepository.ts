import { userType } from '../interfaces/types';
import { User } from '../entities/User';
import * as crypto from 'crypto';

export class UserRepository {
  // login
  static async login(email: string, password: string): Promise<User> {
    try {
      // hash password
      const hash = crypto
        .pbkdf2Sync(password, process.env.SALT, 1000, 64, 'sha512')
        .toString('hex');
      // find user
      const user = User.findOne({
        where: {
          email,
          passwordHash: hash,
        },
        select: {
          id: true,
          email: true,
          userType: true,
        },
      });
      return user;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  static async register(email: string, password: string, userType: string): Promise<User> {
    try {
      // hash password
      const hash = crypto
        .pbkdf2Sync(password, process.env.SALT, 1000, 64, 'sha512')
        .toString('hex');
      // create user
      const user = User.create({
        email,
        passwordHash: hash,
        userType: userType as userType,
      });
      await user.save();
      return user;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  static async getUserById(id: string): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          id,
        },
        relations: {
          shop: true,
        },
      });
      return user;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }
}
