import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { categoriesValidation } from './Categories.validation';
import { CategoriesController } from './Categories.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.ADMIN), validateRequest(categoriesValidation.createCategories), CategoriesController.createCategories);

router.get('/', CategoriesController.getAllCategoriesFromDB);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), validateRequest(categoriesValidation.updateCategories), CategoriesController.updateIntoDB )

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), CategoriesController.deleteFromDB);

export const categoriesRoutes = router;