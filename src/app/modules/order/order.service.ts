/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { OrderCreateInput } from "./order.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

export const OrderService = {
  createOrder: async (orderData: OrderCreateInput): Promise<Order> => {
    try {
      const createdOrder = await prisma.order.create({
        data: orderData
      });
      return createdOrder;
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create an order");
    }
  },

  getAllOrdersForRole: async (role: string, userId?: string): Promise<Order[]> => {
    if (role === 'admin') {
      // If the role is admin, return all orders
      return prisma.order.findMany();
    } else if (role === 'customer' && userId) {
      // If the role is customer, return orders specific to the customer
      return prisma.order.findMany({
        where: { userId },
      });
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid role or missing userId');
    }
  },

  getOrderById: async (orderId: string): Promise<Order | null> => {
    try {
      const order = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });
      return order;
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to retrieve the order");
    }
  },
};

  