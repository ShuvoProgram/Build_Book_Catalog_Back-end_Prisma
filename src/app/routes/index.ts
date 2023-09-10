import express from 'express';
import { authRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: authRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
