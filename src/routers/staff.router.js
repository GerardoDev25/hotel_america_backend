import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Staff.getAll);
router.get('/:staffId', Validator.Staff.verifyId, Service.Staff.getById);
router.post('/', Validator.Staff.create, Service.Staff.create);
router.put('/:staffId', Validator.Staff.verifyId, Service.Staff.update);
router.delete('/:staffId', Validator.Staff.verifyId, Service.Staff.del);

export default router;
