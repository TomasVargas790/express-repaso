import { Router } from 'express';
import { deleteBrand, getBrand, insertBrand, updateBrand } from './service';

const router = Router()
router.get('/', getBrand);
router.get('/:id', getBrand);
router.post('/', insertBrand);
router.patch('/:id', updateBrand);
router.delete('/:id', deleteBrand);

export default router