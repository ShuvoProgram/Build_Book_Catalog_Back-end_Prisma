import express from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';
import { categoriesRoutes } from '../modules/Categories/Categories.routes';
import { BookRoutes } from '../modules/book/book.routes';
import { orderRoutes } from '../modules/order/order.routes';
import { userProfileRoutes } from '../modules/profile/profile.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: authRoutes
  },
  {
    path: '/users',
    routes: userRoutes
  },
  {
    path: '/categories',
    routes: categoriesRoutes
  },
  {
    path: '/books',
    routes: BookRoutes
  },
  {
    path: '/orders',
    routes: orderRoutes
  },
  {
    path: '/profile',
    routes: userProfileRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
