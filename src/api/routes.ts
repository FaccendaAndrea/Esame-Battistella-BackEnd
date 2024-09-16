import { Router } from 'express';
import TodoRouter from './todo/todo.router'
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
const router = Router();

router.use('/todos', TodoRouter)
router.use('/users', userRouter);
router.use(authRouter);

export default router;