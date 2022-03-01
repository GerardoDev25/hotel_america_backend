import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Staff.getAll);

router.get('/search/', Service.Staff.getOne);

router.post('/where', Service.Staff.getWhere);

router.get('/:staffId', Validator.Staff.getById, Service.Staff.getById);

router.post('/', Validator.Staff.create, Service.Staff.create);

router.put('/:staffId', Validator.Staff.update, Service.Staff.update);

router.delete('/:staffId', Validator.Staff.del, Service.Staff.del);

export default router;
