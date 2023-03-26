import { productSeeder } from './productSeeder';
import { userSeeder } from './userSeeder';
import { User } from '../User';

export const seed = async () => {
  try {
    // check if there is any user in the database
    const user = await User.findOne({
      where: {},
    });
    if (user) {
      return;
    }
    console.log('Seeding database...');
    await userSeeder();
    await productSeeder();
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
