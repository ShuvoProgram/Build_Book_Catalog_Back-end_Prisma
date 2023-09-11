import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

export const UserProfileService = {
  getUserProfile: async (userId: string): Promise<User | null> => {
    // Retrieve the user's profile data from the database based on userId
    const userProfile = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        password: true,
        role: true,
        contactNo: true,
        address: true,
        profileImg: true,
      },
    });

    return userProfile as User | null;
  },
};