import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Cafe.getAll);

router.post('/where', Service.Cafe.getWhere);

router.post('/', Validator.Cafe.create, Service.Cafe.cafeCreateAll);

router.post('/:cafeId', Validator.Cafe.update, Service.Cafe.update);

export default router;
