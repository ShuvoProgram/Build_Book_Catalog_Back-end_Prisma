import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OrderController } from "./order.controller";
import { OrderValidation } from "./order.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/create-order",
  auth("customer"), // Only allowed for customers
  validateRequest(OrderValidation.createOrderSchema),
  OrderController.createOrder
);

router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
   OrderController.getAllOrders
);

router.get(
    "/:orderId",
    auth("customer", "admin"), // Allowed for customers and admins
    // validateRequest(OrderValidation.getOrderByIdSchema),
    OrderController.getOrderById
  );

export const orderRoutes = router;