import { Router } from 'express';
import { deleteOrder, getOrder, insertOrder, updateOrder } from './service';

const router = Router()
router.get('/', getOrder);
router.get('/:id', getOrder);
router.post('/', insertOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router