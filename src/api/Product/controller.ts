import { Router } from 'express';
import { deleteProduct, getProduct, insertProduct, updateProduct } from './service';

const router = Router()
router.get('/', getProduct);
router.get('/:id', getProduct);
router.post('/', insertProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router