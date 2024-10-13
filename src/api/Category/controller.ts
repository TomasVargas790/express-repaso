import { Router } from 'express';
import { deleteCategory, getCategory, insertCategory, updateCategory } from './service';

const router = Router()
router.get('/', getCategory);
router.get('/:id', getCategory);
router.post('/', insertCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router