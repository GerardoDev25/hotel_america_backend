import { Router } from 'express';

import Service from '../services';

const router = Router();

router.get('/', Service.Register.getAll);
router.get('/:registerId', Service.Register.getById);
router.post('/', Service.Register.create);
router.put('/:registerId', Service.Register.update);
router.delete('/:registerId', Service.Register.del);

export default router;
