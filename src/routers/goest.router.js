import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Goest.getAll);

router.get('/search/', Service.Goest.getOne);

router.get('/:goestId', Validator.Goest.getById, Service.Goest.getById);

router.post('/', Validator.Goest.create, Service.Goest.create);

router.put('/:goestId', Validator.Goest.update, Service.Goest.update);

router.delete('/:goestId', Validator.Goest.del, Service.Goest.del);

export default router;
