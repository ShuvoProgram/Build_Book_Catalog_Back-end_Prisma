"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post("/create-order", (0, auth_1.default)("customer"), // Only allowed for customers
(0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderSchema), order_controller_1.OrderController.createOrder);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getAllOrders);
router.get("/:orderId", (0, auth_1.default)("customer", "admin"), // Allowed for customers and admins
// validateRequest(OrderValidation.getOrderByIdSchema),
order_controller_1.OrderController.getOrderById);
exports.orderRoutes = router;
