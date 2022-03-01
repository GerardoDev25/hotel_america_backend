import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Amount.getAll);

router.get('/search/', Service.Amount.getOne);

router.post('/where', Service.Amount.getWhere);

router.get('/:amountId', Validator.Amount.getById, Service.Amount.getById);

router.post('/', Validator.Amount.create, Service.Amount.create);

router.put('/:amountId', Validator.Amount.update, Service.Amount.update);

router.delete('/:amountId', Validator.Amount.del, Service.Amount.del);

export default router;
