// Import necessary modules
import express from 'express';
import { UserProfileController } from './profile.controller';


const router = express.Router();

router.get('/', UserProfileController.getUserProfile);

export const userProfileRoutes = router;