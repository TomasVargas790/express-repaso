import { Router } from 'express';
import { deleteProductVersion, getProductVersion, insertProductVersion, updateProductVersion } from './service';

const router = Router()
router.get('/', getProductVersion);
router.get('/:id', getProductVersion);
router.post('/', insertProductVersion);
router.patch('/:id', updateProductVersion);
router.delete('/:id', deleteProductVersion);

export default router