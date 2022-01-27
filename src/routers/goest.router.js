import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Goest.getAll);

router.get('/search/', Service.Goest.getOne);

router.get('/:goestId', Validator.verifyId('goestId'), Service.Goest.getById);

router.post('/', [...Validator.validateRole(['role_reception']), ...Validator.Goest.create], Service.Goest.create);

router.put('/:goestId', [...Validator.validateRole(['role_reception']), ...Validator.verifyId('goestId')], Service.Goest.update);

router.delete('/:goestId', [...Validator.validateRole(['role_reception']), ...Validator.verifyId('goestId')], Service.Goest.del);

export default router;
