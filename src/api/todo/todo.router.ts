import express from 'express';
import { list, detail, add, check, uncheck } from './todo.controller';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';
import { assign } from './todo.controller';

const router = express.Router();
router.use(isAuthenticated);
router.get('/', list);
router.post('/', add);
router.get('/:id', detail);
router.patch('/:id/check', check);
router.patch('/:id/uncheck', uncheck);
router.post('/:id/assign', assign);

export default router;