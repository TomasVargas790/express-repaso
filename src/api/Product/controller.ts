import { Router } from 'express';
import CRUD from './service';
import { useRouter } from '@/utils/crud';

const crud = new CRUD();
const router = Router()

useRouter(router, crud);

export default router