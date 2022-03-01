import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Lodging.getAll);

router.post('/where', Service.Lodging.getWhere);

router.post('/', Validator.Lodging.create, Service.Lodging.lodgingCreateAll);

router.put('/:lodgingId', Validator.Lodging.update, Service.Lodging.update);

export default router;
