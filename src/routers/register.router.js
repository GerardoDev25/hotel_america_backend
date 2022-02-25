import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Register.getAll);

router.get('/search/', Service.Register.getOne);

router.post('/where/', Service.Register.getWhere);

router.get('/:registerId', Validator.Register.getById, Service.Register.getById);

router.post('/', Validator.Register.create, Service.Register.create);

router.put('/:registerId', Validator.Register.update, Service.Register.update);

router.delete('/:registerId', Validator.Register.del, Service.Register.del);

export default router;
