/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import httpStatus from "http-status";
import { OrderService } from "./order.service";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

export const OrderController = {
  createOrder: async (req: Request, res: Response) => {
    try {
      const orderData = req.body;
      const order = await OrderService.createOrder(orderData);
      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Order created successfully",
        data: order,
      });
    } catch (error: any) {
      res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || "Internal Server Error",
        data: null,
      });
    }
  },

  getAllOrders: async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }
        
        const role = jwtHelpers.getUserRoleFromToken(token as string); 
        const userId = jwtHelpers.getUserIdFromToken(token as string); 
        
        //  safely use role and userId.
        
      const orders = await OrderService.getAllOrdersForRole(role as string, userId as string);

      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Orders retrieved successfully',
        data: orders,
      });
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal Server Error',
        data: null,
      });
    }
  },


  getOrderById: async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const order = await OrderService.getOrderById(orderId);

      if (!order) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          statusCode: httpStatus.NOT_FOUND,
          message: "Order not found",
          data: null,
        });
      }

      // Check if the user is authorized to access this order
    // Check if the user is authorized to access this order
      const user = req.user;

      if (user?.role !== "admin" && user?.userId !== order.userId) {
        return res.status(httpStatus.FORBIDDEN).json({
          success: false,
          statusCode: httpStatus.FORBIDDEN,
          message: "Forbidden",
          data: null,
        });
      }


      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Order fetched successfully",
        data: order,
      });
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || "Internal Server Error",
        data: null,
      });
    }
  },

};