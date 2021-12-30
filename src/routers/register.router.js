import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Register.getAll);
router.get('/:registerId', Validator.Register.verifyId, Service.Register.getById);
router.post('/', Validator.Register.create, Service.Register.create);
router.put('/:registerId', Validator.Register.verifyId, Service.Register.update);
router.delete('/:registerId', Validator.Register.verifyId, Service.Register.del);

export default router;
