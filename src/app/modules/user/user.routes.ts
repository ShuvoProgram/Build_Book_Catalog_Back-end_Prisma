import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.get('/',auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUserFromDB);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getByIdFromDB)

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), validateRequest(userValidation.update), UserController.updateIntoDB);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteFromDB);


export const userRoutes = router;