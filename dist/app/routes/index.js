"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const Categories_routes_1 = require("../modules/Categories/Categories.routes");
const book_routes_1 = require("../modules/book/book.routes");
const order_routes_1 = require("../modules/order/order.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_routes_1.authRoutes
    },
    {
        path: '/users',
        routes: user_routes_1.userRoutes
    },
    {
        path: '/categories',
        routes: Categories_routes_1.categoriesRoutes
    },
    {
        path: '/books',
        routes: book_routes_1.BookRoutes
    },
    {
        path: '/orders',
        routes: order_routes_1.orderRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
