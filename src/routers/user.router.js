import { Router } from 'express';
import Service from '../services';

const router = Router();

router.get('/', Service.getUser);

export default router;
