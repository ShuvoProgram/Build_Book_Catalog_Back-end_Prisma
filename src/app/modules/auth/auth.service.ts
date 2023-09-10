import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import bcrypt from 'bcrypt';

const signup = async (data: User): Promise<User> => {
  try {
    // Check if the user with the given email already exists
    const existingUser = await prisma.user.findFirst({
      where: {email: data.email}
    })

    if (existingUser) {
      throw new ApiError(httpStatus.FOUND, `User ${data.email} already exists`);
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(data.password, 12);


    // Create a new user
    const result = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });


    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User creation failed");
    }

    return result;
  } catch (error) {
    // Handle any unexpected errors and re-throw them as ApiError
    if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
    }
  }
};

export const authService = {
  signup,
};
