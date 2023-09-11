"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
exports.OrderService = {
    createOrder: (orderData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createdOrder = yield prisma_1.default.order.create({
                data: orderData
            });
            return createdOrder;
        }
        catch (error) {
            console.log(error);
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to create an order");
        }
    }),
    getAllOrdersForRole: (role, userId) => __awaiter(void 0, void 0, void 0, function* () {
        if (role === 'admin') {
            // If the role is admin, return all orders
            return prisma_1.default.order.findMany();
        }
        else if (role === 'customer' && userId) {
            // If the role is customer, return orders specific to the customer
            return prisma_1.default.order.findMany({
                where: { userId },
            });
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid role or missing userId');
        }
    }),
    getOrderById: (orderId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield prisma_1.default.order.findUnique({
                where: {
                    id: orderId,
                },
            });
            return order;
        }
        catch (error) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to retrieve the order");
        }
    }),
};
