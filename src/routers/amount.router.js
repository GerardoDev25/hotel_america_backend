import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Amount.getAll);

router.get('/search/', Service.Amount.getOne);

router.get('/:amountId', Validator.verifyId('amountId'), Service.Amount.getById);

router.post('/', [...Validator.validateRole(['role_laundry', 'role_reception']), ...Validator.Amount.create], Service.Amount.create);

router.put('/:amountId', [...Validator.validateRole(['role_laundry', 'role_reception']), ...Validator.verifyId('amountId')], Service.Amount.update);

router.delete('/:amountId', [...Validator.validateRole(['role_laundry', 'role_reception']), ...Validator.verifyId('amountId')], Service.Amount.del);

export default router;
