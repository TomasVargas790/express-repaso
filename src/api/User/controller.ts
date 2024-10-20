import { Router } from 'express';
import CRUD from './service';

const crud = new CRUD();
const router = Router()

router.patch('/:id', crud.patch);
router.delete('/:id', crud.delete);

export default router