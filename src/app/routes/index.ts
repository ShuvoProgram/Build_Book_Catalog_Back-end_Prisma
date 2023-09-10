import express from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';
import { categoriesRoutes } from '../modules/Categories/Categories.routes';

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
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
