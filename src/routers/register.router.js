import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Register.getAll);

router.get('/search/', Service.Register.getOne);

router.get('/:registerId', Validator.verifyId('registerId'), Service.Register.getById);

router.post('/', Validator.Register.create, Service.Register.create);

router.put('/:registerId', [...Validator.validateRole(['role_reception']), ...Validator.verifyId('registerId')], Service.Register.update);

router.delete('/:registerId', [...Validator.validateRole(['role_reception']), ...Validator.verifyId('registerId')], Service.Register.del);

export default router;
