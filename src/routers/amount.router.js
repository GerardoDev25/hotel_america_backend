import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Amount.getAll);
router.get('/:amountId', Validator.Amount.verifyId, Service.Amount.getById);
router.post('/', Validator.Amount.create, Service.Amount.create);
router.put('/:amountId', Validator.Amount.verifyId, Service.Amount.update);
router.delete('/:amountId', Validator.Amount.verifyId, Service.Amount.del);

export default router;
