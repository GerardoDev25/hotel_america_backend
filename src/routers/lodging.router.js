import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Lodging.getAll);

router.get('/search/', Service.Lodging.getOne);

router.post('/where', Service.Lodging.getWhere);

router.get('/:loggingId', Validator.Lodging.getById, Service.Lodging.getById);

router.post('/', Validator.Lodging.create, Service.Lodging.lodgingCreateAll);

router.put('/:lodgingId', Validator.Lodging.update, Service.Lodging.update);

export default router;
