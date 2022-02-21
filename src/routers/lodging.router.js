import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Lodging.getAll);

router.get('/search/', Service.Lodging.getOne);

router.post('/where', Service.Lodging.getWhere);

// router.get('/:amountId', Validator.Amount.getById, Service.Amount.getById);
router.get('/:loggingId', Service.Lodging.getById);

router.post('/', Service.Lodging.createByRegistersId);

// router.put('/:amountId', Validator.Amount.update, Service.Amount.update);
router.put('/:lodgingId', Service.Lodging.update);

// router.delete('/:amountId', Validator.Amount.del, Service.Amount.del);
router.delete('/:registerId', Service.Lodging.delByRegisterId);

export default router;
