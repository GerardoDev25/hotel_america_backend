import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Staff.getAll);

router.get('/:staffId', Validator.verifyId('staffId'), Service.Staff.getById);

router.post('/', [...Validator.validateRole(['role_admin']), ...Validator.Staff.create], Service.Staff.create);

router.put('/:staffId', [...Validator.validateRole(['role_admin']), ...Validator.verifyId('staffId')], Service.Staff.update);

router.delete('/:staffId', [...Validator.validateRole(['role_admin']), ...Validator.verifyId('staffId')], Service.Staff.del);

export default router;
