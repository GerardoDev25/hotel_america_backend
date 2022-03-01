import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Cafe.getAll);

router.post('/where', Service.Cafe.getWhere);

router.post('/', Validator.Cafe.create, Service.Cafe.cafeCreateAll);

// router.get('/search/', Service.Cafe.getOne);

// router.get('/:cafeId', Validator.Cafe.getById, Service.Cafe.getById);

// router.put('/:cafeId', Validator.Cafe.update, Service.Cafe.update);

// router.delete('/:cafeId', Validator.Cafe.del, Service.Cafe.cafeDelByRegisterId);

export default router;
