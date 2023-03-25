import { UserRepository } from '../repositories/UserRepository';
import { Response } from '../interfaces/response';
import * as jwt from 'jsonwebtoken';

async function login(email: string, password: string): Promise<Response> {
  try {
    const user = await UserRepository.login(email, password);
    if (!user) {
      return {
        statusCode: 400,
        error: 'User not found',
      };
    }
    // jwt sign
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return {
      statusCode: 200,
      data: {
        token,
        user,
      },
    };
  } catch (err) {
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
  }
}

async function register(email: string, password: string): Promise<Response> {
  try {
    const user = await UserRepository.register(email, password);
    return {
      statusCode: 200,
      data: user,
    };
  } catch (err) {
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
  }
}

export const UserController = {
  login,
  register,
};
