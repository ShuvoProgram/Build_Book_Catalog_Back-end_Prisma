/* eslint-disable @typescript-eslint/no-explicit-any */
// Import necessary modules
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { UserProfileService } from './profile.service';
import { jwtHelpers } from '../../../helpers/jwtHelpers';


export const UserProfileController = {
  getUserProfile: async (req: Request, res: Response) => {
    try {
      // Extract the token from the request headers
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      // Decode the token to get the userId
      const userId = jwtHelpers.getUserIdFromToken(token as string); // Ensure to handle token type as shown previously

      // Retrieve the user's profile data based on userId
      const userProfile = await UserProfileService.getUserProfile(userId as string);

      if (!userProfile) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User profile not found');
      }

      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'User profile retrieved successfully',
        data: userProfile,
      });
    } catch (error: any) {
      res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal Server Error',
        data: null,
      });
    }
  },
};