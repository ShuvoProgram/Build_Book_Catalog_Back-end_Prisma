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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const order_service_1 = require("./order.service");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
exports.OrderController = {
    createOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const orderData = req.body;
            const order = yield order_service_1.OrderService.createOrder(orderData);
            res.status(http_status_1.default.OK).json({
                success: true,
                statusCode: http_status_1.default.OK,
                message: "Order created successfully",
                data: order,
            });
        }
        catch (error) {
            res.status(error.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: error.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR,
                message: error.message || "Internal Server Error",
                data: null,
            });
        }
    }),
    getAllOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
            }
            const role = jwtHelpers_1.jwtHelpers.getUserRoleFromToken(token);
            const userId = jwtHelpers_1.jwtHelpers.getUserIdFromToken(token);
            //  safely use role and userId.
            const orders = yield order_service_1.OrderService.getAllOrdersForRole(role, userId);
            res.status(http_status_1.default.OK).json({
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Orders retrieved successfully',
                data: orders,
            });
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: error.message || 'Internal Server Error',
                data: null,
            });
        }
    }),
    getOrderById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { orderId } = req.params;
            const order = yield order_service_1.OrderService.getOrderById(orderId);
            if (!order) {
                return res.status(http_status_1.default.NOT_FOUND).json({
                    success: false,
                    statusCode: http_status_1.default.NOT_FOUND,
                    message: "Order not found",
                    data: null,
                });
            }
            // Check if the user is authorized to access this order
            // Check if the user is authorized to access this order
            const user = req.user;
            if ((user === null || user === void 0 ? void 0 : user.role) !== "admin" && (user === null || user === void 0 ? void 0 : user.userId) !== order.userId) {
                return res.status(http_status_1.default.FORBIDDEN).json({
                    success: false,
                    statusCode: http_status_1.default.FORBIDDEN,
                    message: "Forbidden",
                    data: null,
                });
            }
            res.status(http_status_1.default.OK).json({
                success: true,
                statusCode: http_status_1.default.OK,
                message: "Order fetched successfully",
                data: order,
            });
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: error.message || "Internal Server Error",
                data: null,
            });
        }
    }),
};
