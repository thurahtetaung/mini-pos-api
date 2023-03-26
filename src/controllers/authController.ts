import { UserRepository } from '../repositories/UserRepository';

// check permission for user

// wrap admin only controllers with this function
export async function adminOnly(userId: string, shopId: string) {
  const user = await UserRepository.getUserById(userId);
  console.log(user);
  if (!user || user.userType !== 'admin') {
    throw new Error('Unauthorized');
  }
  if (!user.shop.id || user.shop.id !== shopId) {
    throw new Error('Unauthorized');
  }
  return true;
}
