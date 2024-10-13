import { Router } from 'express';
import { deleteCustomer, getCustomer, insertCustomer, updateCustomer } from './service';

const router = Router()
router.get('/', getCustomer);
router.get('/:id', getCustomer);
router.post('/', insertCustomer);
router.patch('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router