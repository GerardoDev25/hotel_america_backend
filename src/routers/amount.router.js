import { Router } from 'express';

import Service from '../services';

const router = Router();

router.get('/', Service.Amount.getAll);
router.get('/:amountId', Service.Amount.getById);
router.post('/', Service.Amount.create);
router.put('/:amountId', Service.Amount.update);
router.delete('/:amountId', Service.Amount.del);

export default router;
