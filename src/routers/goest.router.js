import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Goest.getAll);
router.get('/:goestId', Validator.Goest.verifyId, Service.Goest.getById);
router.post('/', Validator.Goest.create, Service.Goest.create);
router.put('/:goestId', Validator.Goest.verifyId, Service.Goest.update);
router.delete('/:goestId', Validator.Goest.verifyId, Service.Goest.del);

export default router;
