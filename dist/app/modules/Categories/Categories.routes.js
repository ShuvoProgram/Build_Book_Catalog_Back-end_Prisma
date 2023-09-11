"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Categories_validation_1 = require("./Categories.validation");
const Categories_controller_1 = require("./Categories.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(Categories_validation_1.categoriesValidation.createCategories), Categories_controller_1.CategoriesController.createCategories);
router.get('/', Categories_controller_1.CategoriesController.getAllCategoriesFromDB);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(Categories_validation_1.categoriesValidation.updateCategories), Categories_controller_1.CategoriesController.updateIntoDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), Categories_controller_1.CategoriesController.deleteFromDB);
exports.categoriesRoutes = router;
