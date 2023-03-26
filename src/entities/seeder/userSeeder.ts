import { UserController } from '../../controllers/userController';
import { ShopController } from '../../controllers/shopController';

// Create an admin user from env variables
export const userSeeder = async () => {
  const user = await UserController.register(
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_PASSWORD,
    'admin',
  );
  await ShopController.createShop(process.env.SHOP_NAME, 5, user.data.id);
};
